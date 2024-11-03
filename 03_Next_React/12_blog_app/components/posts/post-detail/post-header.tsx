import Image from "next/image";

import classes from "./post-header.module.scss";

function PostHeader(props: Post): JSX.Element {
  const { title, image } = props;
  // console.log({ image });
  // console.log({ title });

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;
