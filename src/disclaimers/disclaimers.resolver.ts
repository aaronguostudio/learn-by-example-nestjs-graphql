import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Disclaimer } from './entities/disclaimer.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateDisclaimerInput } from './dto/create-disclaimer.input';
import { DisclaimersService } from './disclaimers.service';
import { UpdateDisclaimerInput } from './dto/update-disclaimer.input';

@Resolver()
export class DisclaimersResolver {
  constructor(private readonly disclaimersService: DisclaimersService) {}

  @Query(() => [Disclaimer], { name: 'disclaimers' })
  async findAll(): Promise<Disclaimer[]> {
    return this.disclaimersService.findAll();
  }

  @Query(() => Disclaimer, { name: 'disclaimer' })
  async findOne(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.disclaimersService.findOne(id);
  }

  @Mutation(() => Disclaimer, { name: 'createDisclaimer' })
  async create(
    @Args('createDisclaimerInput') createDisclaimerInput: CreateDisclaimerInput,
  ) {
    console.log('> createDisclaimerInput', createDisclaimerInput);
    return this.disclaimersService.create(createDisclaimerInput);
  }

  @Mutation(() => Disclaimer, { name: 'updateDisclaimer' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateDisclaimerInput') updateDisclaimerInput: UpdateDisclaimerInput,
  ) {
    return this.disclaimersService.update(id, updateDisclaimerInput);
  }

  @Mutation(() => Disclaimer, { name: 'deleteDisclaimer' })
  async delete(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.disclaimersService.delete(id);
  }
}
