import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
@ObjectType({
  description: 'The disclaimer object type',
})
export class Disclaimer {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Unique identifier of the disclaimer' })
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  // @Field(() => [String]), this is not needed since the plugin is installed
  // @Column({ type: 'json' })
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.disclaimers, { cascade: true })
  tags?: Tag[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    nullable: true,
  })
  updatedAt?: Date;

  @Column({
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    nullable: true,
  })
  createdBy?: string;

  @Column({
    nullable: true,
  })
  updatedBy?: string;

  @Column({
    nullable: true,
  })
  deletedBy?: string;
}
