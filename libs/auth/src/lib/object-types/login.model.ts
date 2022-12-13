import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseType {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  userId!: number;

  @Field(() => String, { nullable: false })
  username!: string;
}
