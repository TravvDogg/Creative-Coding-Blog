import { PageProps } from "$fresh/server.ts";
import { Post } from "@/utils/posts.ts";

export default function Blog404Page(props: PageProps<Post[]>) {
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Error</h1>
      <div class="mt-8">
        <p>404:</p>
        <p>File not found</p>
      </div>
    </main>
  );
}
