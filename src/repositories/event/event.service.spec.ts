import { Test, TestingModule } from '@nestjs/testing';
import { EventRepository } from './event.repository';

describe('EventRepository', () => {
  let service: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRepository],
    }).compile();

    service = module.get<EventRepository>(EventRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
