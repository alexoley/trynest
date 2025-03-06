import { Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class CassandraService {
    
  private client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ['127.0.0.1:9042'], // Replace with your Cassandra node IPs
      localDataCenter: 'datacenter1', // Replace with your data center name
      keyspace: 'detection', // Replace with your keyspace
    });
  }

  async executeQuery(query: string, params?: any[]) {
    return this.client.execute(query, params, { prepare: true });
  }
}
