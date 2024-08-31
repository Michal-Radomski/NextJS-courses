import next from "next";
import Server from "next/dist/next-server/server/next-server";

const nextApp: Server = next({
  dev: process.env.NODE_ENV !== "production",
  dir: __dirname,
});

export default nextApp;
