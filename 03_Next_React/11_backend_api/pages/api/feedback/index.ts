import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export function buildFeedbackPath(): string {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: string): Feedback[] {
  const fileData: Buffer = fs.readFileSync(filePath);
  const data: Feedback[] = JSON.parse(fileData.toString());
  return data;
}

function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    const email: string = req.body.email;
    const feedbackText: string = req.body.text;

    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
