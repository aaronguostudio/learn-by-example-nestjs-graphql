import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDisclaimerInput } from './create-disclaimer.input';

@InputType()
export class UpdateDisclaimerInput extends PartialType(CreateDisclaimerInput) {}
