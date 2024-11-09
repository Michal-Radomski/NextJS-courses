// our-domain.com/new-meetup

import React from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage(): JSX.Element {
  const router: NextRouter = useRouter();

  async function addMeetupHandler(enteredMeetupData: MeetUp): Promise<void> {
    const response: Response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log("data:", data);

    router.push("/");
  }

  return (
    <React.Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetups and create amazing networking opportunities." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </React.Fragment>
  );
}

export default NewMeetupPage;
