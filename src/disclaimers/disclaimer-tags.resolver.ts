import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Tag } from './entities/tag.entity';
import { Disclaimer } from './entities/disclaimer.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { TagsByDisclaimerLoader } from './data-loader/tags-by-disclaimer.loader';

@Resolver(() => Disclaimer) // parent type
export class DisclaimerTagsResolver {
  constructor(
    // @InjectRepository(Tag)
    // private readonly tagsRepository: Repository<Tag>,

    private readonly tagsByDisclaimerLoader: TagsByDisclaimerLoader,
  ) {}

  @ResolveField('tags', () => [Tag])
  async getTagsOfDisclaimer(@Parent() disclaimer: Disclaimer) {
    // const tags = await this.tagsRepository.find({
    //   where: {
    //     disclaimers: {
    //       id: disclaimer.id,
    //     },
    //   },
    // });

    // return tags;

    // return this.tagsRepository
    //   .createQueryBuilder('tag')
    //   .innerJoin(
    //     'tag.disclaimers',
    //     'disclaimers',
    //     'disclaimers.id = :disclaimerId',
    //     { disclaimerId: disclaimer.id },
    //   )
    //   .getMany();

    return this.tagsByDisclaimerLoader.load(disclaimer.id);
  }
}
