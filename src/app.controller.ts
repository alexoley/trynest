import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("events")
  async getEvents(
  @Query('pageSize') pageSize: number = 10,
  @Query('pageState') pageState?: string,
  @Query('object_type') objectType?: string
  ) {
        const filters: { [key: string]: any } = {};
        if (objectType) filters.object_type = objectType;
    
        const result = await this.appService.getEvents(pageSize, pageState, filters);
        return {
          events: result.events,
          pageState: result.pageState, // Return the pageState to the client
        };
  }
}
