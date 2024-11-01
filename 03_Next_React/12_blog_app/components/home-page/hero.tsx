import Image from "next/image";

import classes from "./hero.module.scss";

function Hero(): JSX.Element {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/tux.png" alt="An image showing Tux" width={300} height={300} />
      </div>
      <h1>Hi, I'm Tux</h1>
      <p>I blog about web development - especially React and node.</p>
    </section>
  );
}

export default Hero;
