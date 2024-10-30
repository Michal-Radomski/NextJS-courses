import { NextApiRequest, NextApiResponse } from "next";

import { buildFeedbackPath, extractFeedback } from "./index";

function handler(req: NextApiRequest, res: NextApiResponse): void {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find((feedback: Feedback) => feedback.id === feedbackId) as Feedback;
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
