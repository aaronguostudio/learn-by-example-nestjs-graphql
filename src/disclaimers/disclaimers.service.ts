import { Injectable } from '@nestjs/common';
import { CreateDisclaimerInput } from './dto/create-disclaimer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Disclaimer } from './entities/disclaimer.entity';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';
import { UpdateDisclaimerInput } from './dto/update-disclaimer.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class DisclaimersService {
  constructor(
    @InjectRepository(Disclaimer)
    private readonly disclaimerRepository: Repository<Disclaimer>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.disclaimerRepository.find();
  }

  async findOne(id: number) {
    const disclaimer = await this.disclaimerRepository.findOne({
      where: {
        id,
      },
    });

    console.log('> disclaimer', disclaimer);

    if (!disclaimer) {
      throw new UserInputError(`Disclaimer with id ${id} not found`);
    }

    return disclaimer;
  }

  async create(createDisclaimerInput: CreateDisclaimerInput) {
    const tags = await Promise.all(
      createDisclaimerInput.tags.map((name) => this.preloadTagByName(name)),
    );

    const disclaimer = this.disclaimerRepository.create({
      ...createDisclaimerInput,
      tags,
    });

    return this.disclaimerRepository.save(disclaimer);
  }

  async update(id: number, updateDisclaimerInput: UpdateDisclaimerInput) {
    const tags =
      updateDisclaimerInput.tags &&
      (await Promise.all(
        updateDisclaimerInput.tags.map((name) => this.preloadTagByName(name)),
      ));

    const disclaimer = await this.disclaimerRepository.preload({
      id,
      ...updateDisclaimerInput,
      tags,
    });

    if (!disclaimer) {
      throw new UserInputError(`Disclaimer with id ${id} not found`);
    }

    return this.disclaimerRepository.save(disclaimer);
  }

  async delete(id: number) {
    const disclaimer = await this.findOne(id);

    if (!disclaimer) {
      throw new UserInputError(`Disclaimer with id ${id} not found`);
    }

    const result = { ...disclaimer };

    await this.disclaimerRepository.remove(disclaimer);
    return result;
  }

  private async preloadTagByName(name: string) {
    const existingTag = await this.tagRepository.findOne({
      where: {
        name,
      },
    });

    if (existingTag) {
      return existingTag;
    }

    return this.tagRepository.create({ name });
  }
}
