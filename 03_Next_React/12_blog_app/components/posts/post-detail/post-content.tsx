import { ElementType } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import PostHeader from "./post-header";
import classes from "./post-content.module.scss";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("css", css);

function PostContent(props: { post: Post }): JSX.Element {
  const { post } = props;

  const imagePath: string = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: { [nodeType: string]: ElementType } = {
    // img(image): JSX.Element {
    //   console.log("image:", image);
    //   return <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />;
    // },

    p(paragraph): JSX.Element {
      // console.log("paragraph:", paragraph);

      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        // console.log({ image });

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code): JSX.Element {
      // console.log("code:", code);
      const { className, children } = code as { className: string; children: string };
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return <SyntaxHighlighter style={atomDark} language={language} children={children} />;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
