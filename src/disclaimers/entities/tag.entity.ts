import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Disclaimer } from './disclaimer.entity';

@Entity()
@ObjectType({
  description: 'Tag',
})
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => Disclaimer, (disclaimer) => disclaimer.tags)
  disclaimers: Disclaimer[];
}
