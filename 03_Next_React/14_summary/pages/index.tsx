import React from "react";
import Head from "next/head";
import { Collection, Db, MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props: { meetups: MeetUp[] }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props?.meetups} />
    </React.Fragment>
  );
}

//* Runs on every request!
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // Fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//* Only in page components! -> Static Generation!
export async function getStaticProps(): Promise<any> {
  // fetch data from an API

  const client: MongoClient = await MongoClient.connect(process.env.MONG0_URL as string);
  const db: Db = client.db();

  const meetupsCollection: Collection<Document> = db.collection("meetups");

  const meetups = (await meetupsCollection.find().toArray()) as unknown as MeetUp[];

  client.close();

  return {
    props: {
      meetups: meetups.map(
        (meetup: MeetUp): MeetUp => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup?._id?.toString(),
        })
      ),
    },
    revalidate: 60,
  };
}

export default HomePage;
