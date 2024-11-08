import React from "react";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Params } from "next/dist/server/request/params";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props: { meetupData: MeetUp }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const client: MongoClient = await MongoClient.connect("");
  const db: Db = client.db();

  const meetupsCollection: Collection<Document> = db.collection("meetups");

  const meetups = (await meetupsCollection
    .find(
      {},
      {
        projection: { _id: 0 },
      }
    )
    .toArray()) as MeetUp[];

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup: MeetUp) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context: { params: Params }) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId as string;

  const client: MongoClient = await MongoClient.connect("");
  const db: Db = client.db();

  const meetupsCollection: Collection<Document> = db.collection("meetups");

  const selectedMeetup = (await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  })) as MeetUp;

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
    },
  };
}

export default MeetupDetails;
