import { Test, TestingModule } from '@nestjs/testing';
import { DisclaimersService } from './disclaimers.service';

describe('DisclaimersService', () => {
  let service: DisclaimersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisclaimersService],
    }).compile();

    service = module.get<DisclaimersService>(DisclaimersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
