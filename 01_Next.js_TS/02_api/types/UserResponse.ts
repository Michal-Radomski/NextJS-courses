import { ObjectType, Field } from "type-graphql";

import { User } from "../entity/User";

@ObjectType({ description: "User Response Model" })
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
