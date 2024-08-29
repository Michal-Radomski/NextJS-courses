import { connect } from "mongoose";

export default async function createSession(): Promise<void> {
  const MONGO_URL = process.env.MONGO_URL as string;
  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL");
  }
  const options = {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    autoIndex: true,
  };
  await connect(MONGO_URL, options);
}
