import { Controller, Get, Query  } from '@nestjs/common';
import { EventRepository } from '../../repositories/event/event.repository';

@Controller('events')
export class EventController {
    constructor(private readonly eventRepository: EventRepository) {}

    @Get()
    async getEvents(
      @Query('pageSize') pageSize: number = 10,
      @Query('pageState') pageState?: string,
      @Query('object_type') objectType?: string
    ) {
      const filters: { [key: string]: any } = {};
      if (objectType) filters.object_type = objectType;
  
      const result = await this.eventRepository.findAll(pageSize, pageState, filters);
      return {
        events: result.events,
        pageState: result.pageState, // Return the pageState to the client
      };
    }
}
