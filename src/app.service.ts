import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';


@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async getEvents(
        pageSize: number = 10,
        pageState?: string,
        filters: { [key: string]: any } = {}) {
    return this.appRepository.getEvents(pageSize, pageState, filters);
  }
}
