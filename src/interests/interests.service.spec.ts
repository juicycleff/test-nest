import { Test, TestingModule } from '@nestjs/testing';
import { InterestsService } from './interests.service';

describe('InterestsService', () => {
  let service: InterestsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestsService],
    }).compile();
    service = module.get<InterestsService>(InterestsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
