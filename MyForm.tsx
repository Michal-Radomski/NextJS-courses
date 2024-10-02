// Import necessary modules
"use client"; // This directive indicates that the component will run on the client side
import { useFormState } from "react-dom";

// Define the type for the form state
type FormState = {
  username: string;
  age: number;
};

// Server action to process form data
async function saveProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const username = (formData.get("username") as string) || "";
  const age = parseInt(formData.get("age") as string) || 0;

  // Return the new state
  return { username, age };
}

// React component using useFormState
const MyForm: React.FC = () => {
  // Initialize useFormState with the server action and initial state
  const [state, action] = useFormState(saveProfile, { username: "", age: 0 });

  return (
    <form action={action}>
      <input type="text" name="username" placeholder="Username" defaultValue={state.username} />
      <input type="number" name="age" placeholder="Age" defaultValue={state.age} />
      <button type="submit">Submit</button>
      <div>
        {state.username && <p>Submitted Username: {state.username}</p>}
        {state.age > 0 && <p>Submitted Age: {state.age}</p>}
      </div>
    </form>
  );
};

export default MyForm;
