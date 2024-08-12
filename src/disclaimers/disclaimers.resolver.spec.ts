import { Test, TestingModule } from '@nestjs/testing';
import { DisclaimersResolver } from './disclaimers.resolver';

describe('DisclaimersResolver', () => {
  let resolver: DisclaimersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisclaimersResolver],
    }).compile();

    resolver = module.get<DisclaimersResolver>(DisclaimersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
