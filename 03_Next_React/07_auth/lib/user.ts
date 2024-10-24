import db from "./db";

export function createUser(email: string, password: string): number {
  const result = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, password);
  return result.lastInsertRowid as number;
}

export function getUserByEmail(email: string): UserI {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as UserI;
}
