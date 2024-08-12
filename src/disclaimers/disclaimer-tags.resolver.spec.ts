import { Test, TestingModule } from '@nestjs/testing';
import { DisclaimerTagsResolver } from './disclaimer-tags.resolver';

describe('DisclaimerTagsResolver', () => {
  let resolver: DisclaimerTagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisclaimerTagsResolver],
    }).compile();

    resolver = module.get<DisclaimerTagsResolver>(DisclaimerTagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
