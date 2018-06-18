import { Test, TestingModule } from '@nestjs/testing';
import { DatabasesService } from './databases.service';

describe('DatabasesService', () => {
  let service: DatabasesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabasesService],
    }).compile();
    service = module.get<DatabasesService>(DatabasesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
