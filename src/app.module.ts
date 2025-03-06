import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { EventRepository } from './repositories/event/event.repository';
import { EventController } from './controllers/event/event.controller';

@Module({
  imports: [CassandraModule],
  controllers: [AppController, EventController],
  providers: [AppService, EventRepository],
})
export class AppModule {}
