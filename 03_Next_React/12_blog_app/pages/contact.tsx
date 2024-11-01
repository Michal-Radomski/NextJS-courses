import React from "react";
import Head from "next/head";

import ContactForm from "../components/contact/contact-form";

const ContactPage = (): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages!" />
      </Head>
      <ContactForm />
    </React.Fragment>
  );
};

export default ContactPage;
