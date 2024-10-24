import { redirect } from "next/navigation";
import { Session, User } from "lucia";

import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";

export default async function TrainingPage(): Promise<JSX.Element> {
  const trainingSessions = getTrainings() as Training[];

  const result = (await verifyAuth()) as
    | {
        user: User;
        session: Session;
      }
    | {
        user: null;
        session: null;
      };

  if (!result.user) {
    return redirect("/");
  }

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training: Training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
