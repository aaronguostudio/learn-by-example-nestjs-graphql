import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Disclaimer } from '../entities/disclaimer.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class TagsByDisclaimerLoader extends DataLoader<number, Tag[]> {
  constructor(
    @InjectRepository(Disclaimer)
    private readonly disclaimersRepository: Repository<Disclaimer>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    disclaimerIds: readonly number[],
  ): Promise<Tag[][]> {
    const disclaimersWithTags = await this.disclaimersRepository.find({
      select: ['id'],
      relations: {
        tags: true,
      },
      where: {
        id: In(disclaimerIds as number[]),
      },
    });

    return disclaimersWithTags.map((d) => d.tags);
  }
}
