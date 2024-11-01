import Link from "next/link";
import Image from "next/image";

import classes from "./post-item.module.scss";

function PostItem(props: { post: Post }): JSX.Element {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate: string = new Date(date as Date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath: string = `/images/posts/${slug}/${image}`;
  const linkPath: string = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            // layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
