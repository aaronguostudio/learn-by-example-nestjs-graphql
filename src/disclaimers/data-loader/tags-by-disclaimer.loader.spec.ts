import { Test, TestingModule } from '@nestjs/testing';
import { TagsByDisclaimerLoader } from './tags-by-disclaimer.loader';

describe('TagsByDisclaimerLoader', () => {
  let provider: TagsByDisclaimerLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsByDisclaimerLoader],
    }).compile();

    provider = module.get<TagsByDisclaimerLoader>(TagsByDisclaimerLoader);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
