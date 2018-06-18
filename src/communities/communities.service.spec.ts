import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesService } from './communities.service';

describe('CommunitiesService', () => {
  let service: CommunitiesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesService],
    }).compile();
    service = module.get<CommunitiesService>(CommunitiesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
