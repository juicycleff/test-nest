import { Test, TestingModule } from '@nestjs/testing';
import { Databases } from './databases';

describe('Databases', () => {
  let provider: Databases;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Databases],
    }).compile();
    provider = module.get<Databases>(Databases);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
