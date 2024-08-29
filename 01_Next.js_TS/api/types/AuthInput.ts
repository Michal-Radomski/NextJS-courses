import { InputType, Field } from "type-graphql";

@InputType({ description: "Auth Model" })
export class AuthInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
