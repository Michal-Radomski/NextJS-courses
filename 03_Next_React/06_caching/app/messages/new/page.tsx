import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { addMessage } from "@/lib/messages";

export default function NewMessagePage(): JSX.Element {
  async function createMessage(formData: FormData) {
    "use server";

    const message = formData.get("message") as FormDataEntryValue;
    // console.log("message:", message);
    addMessage(message);
    // revalidatePath('/messages'); //* default "page" - page only, "layout" page + subpages
    revalidateTag("msg");
    redirect("/messages");
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
