import { NextApiRequest, NextApiResponse } from "next";

import { buildFeedbackPath, extractFeedback } from "./index";

//* http://localhost:3000/api/feedback/feedbackId
function handler(req: NextApiRequest, res: NextApiResponse): void {
  const feedbackId = req.query.feedbackId as string;
  const filePath: string = buildFeedbackPath();
  const feedbackData: Feedback[] = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find((feedback: Feedback) => feedback.id === feedbackId) as Feedback;
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
