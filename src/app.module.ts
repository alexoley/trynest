import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { AppRepository } from './app.repository';


@Module({
  imports: [CassandraModule],
  controllers: [AppController],
  providers: [AppService, AppRepository],
  exports: [AppRepository]
})
export class AppModule {}
