import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export function buildFeedbackPath(): string {
  const filePath: string = path.join(process.cwd(), "data", "feedback.json");
  // console.log({ filePath });
  return filePath;
}

export function extractFeedback(filePath: string): Feedback[] {
  const fileData: Buffer = fs.readFileSync(filePath);
  const data: Feedback[] = JSON.parse(fileData.toString());
  return data;
}

//* http://localhost:3000/api/feedback
function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    const email: string = req.body.email;
    const feedbackText: string = req.body.text;

    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // Store that in a database or in a file
    const filePath: string = buildFeedbackPath();
    const data: Feedback[] = extractFeedback(filePath);
    data.push(newFeedback);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath: string = buildFeedbackPath();
    const data: Feedback[] = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
