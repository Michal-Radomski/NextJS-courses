import { GraphQLScalarType, Kind, ValueNode } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",

  parseValue(value) {
    if (typeof value === "string") {
      return new ObjectId(value); // value from the client input variables
    }
  },

  serialize(value) {
    if (value instanceof ObjectId) {
      return value.toHexString(); // value sent to the client
    }
  },

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});
