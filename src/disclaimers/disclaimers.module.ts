import { Module } from '@nestjs/common';
import { DisclaimersResolver } from './disclaimers.resolver';
import { DisclaimersService } from './disclaimers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disclaimer } from './entities/disclaimer.entity';
import { Tag } from './entities/tag.entity';
import { DisclaimerTagsResolver } from './disclaimer-tags.resolver';
import { TagsByDisclaimerLoader } from './data-loader/tags-by-disclaimer.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Disclaimer, Tag])],
  providers: [
    DisclaimersResolver,
    DisclaimersService,
    DisclaimerTagsResolver,
    TagsByDisclaimerLoader,
  ],
})
export class DisclaimersModule {}
