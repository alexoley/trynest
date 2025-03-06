import { Module } from '@nestjs/common';
import { CassandraService } from './cassandra.service';
import { EventRepository } from '../repositories/event/event.repository';

@Module({
  providers: [CassandraService, EventRepository],
  exports: [CassandraService, EventRepository],
})
export class CassandraModule {}
