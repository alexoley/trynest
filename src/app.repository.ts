import { Injectable, Logger } from '@nestjs/common';
import { CassandraService } from './cassandra/cassandra.service';

@Injectable()
export class AppRepository {

    private readonly logger = new Logger(AppRepository.name);

    constructor(private readonly cassandraService: CassandraService) {}
  
    async getEvents(
      pageSize: number = 10,
      pageState?: string, // Use pageState for token-based pagination
      filters: { [key: string]: any } = {},
    ) {
      let query = 'SELECT * FROM event';
      const queryParams: any[] = [];
  
      // Log the start of the query
      this.logger.log(
        `Fetching events with pagination (pageSize: ${pageSize}, pageState: ${pageState}) and filters: ${JSON.stringify(filters)}`,
      );


      // Add filters
      const filterKeys = Object.keys(filters);

      if (filterKeys.length > 0 || !!pageState!){
        query += ' WHERE ';
      }
  
      if (filterKeys.length > 0) {
        query += filterKeys
          .map((key, index) => `${key} = ?`)
          .join(' AND ');
        queryParams.push(...filterKeys.map((key) => filters[key]));
      }

        // If pageState is provided, use it for token-based pagination
      if (pageState) {
        query += ' token(unique_id) > token(?)';
        queryParams.push(pageState);
      }
  
      // Add pagination (LIMIT only)
      query += ' LIMIT ?';
      queryParams.push(pageSize);
  
      // Log the final query and parameters
      this.logger.debug(`Executing query: ${query}`);
      this.logger.debug(`Query parameters: ${JSON.stringify(queryParams)}`);
  
      try {
        const result = await this.cassandraService.executeQuery(query, queryParams);
  
        // Log the successful result
        this.logger.log(`Successfully fetched ${result.rowLength} events`);
        return {
          events: result.rows,
          pageState: result.pageState, // Return the pageState for the next page
        };
      } catch (error) {
        // Log the error
        this.logger.error(`Failed to fetch events: ${error.message}`, error.stack);
        throw error;
      }
    }
}
