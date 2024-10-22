import { createPost } from "@/actions/posts";
import PostForm from "@/components/post-form";

export default function NewPostPage(): JSX.Element {
  return <PostForm action={createPost} />;
}
