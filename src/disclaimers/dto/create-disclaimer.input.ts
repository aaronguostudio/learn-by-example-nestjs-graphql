import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateDisclaimerInput {
  @MinLength(3)
  name: string;
  content: string;
  tags: string[];
}
