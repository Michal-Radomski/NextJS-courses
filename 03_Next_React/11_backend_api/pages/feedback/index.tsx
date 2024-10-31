import React from "react";

import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

function FeedbackPage(props: { feedbackItems: Feedback[] }): JSX.Element {
  const [feedbackData, setFeedbackData] = React.useState<Feedback | null>(null);

  function loadFeedbackHandler(id: string): void {
    fetch(`/api/feedback/${id}`)
      .then((response: Response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      })
      .catch((err) => console.log("err:", err));
  }

  return (
    <React.Fragment>
      {feedbackData ? <p>{feedbackData.email}</p> : null}
      <ul>
        {props.feedbackItems.map(
          (item: Feedback): JSX.Element => (
            <li key={item.id as string}>
              {item.text} <button onClick={loadFeedbackHandler.bind(null, item.id as string)}>Show Details</button>
            </li>
          )
        )}
      </ul>
    </React.Fragment>
  );
}

export async function getStaticProps(): Promise<any> {
  const filePath: string = buildFeedbackPath();
  const data: Feedback[] = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
