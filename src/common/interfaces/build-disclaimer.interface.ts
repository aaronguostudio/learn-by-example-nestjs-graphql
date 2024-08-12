import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BuildDisclaimer {
  @Field()
  name: string;
}
