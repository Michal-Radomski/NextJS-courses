import React from "react";
import Head from "next/head";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props: { post: Post }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>{props.post.title as string}</title>
        <meta name="description" content={props.post.excerpt as string} />
      </Head>
      <PostContent post={props.post} />
    </React.Fragment>
  );
}

export function getStaticProps(context: { params: Params }) {
  const { params }: { params: Params } = context;
  const { slug } = params as { slug: string };

  const postData: Post = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames: string[] = getPostsFiles();

  const slugs: string[] = postFilenames.map((fileName: string) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug: string) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
