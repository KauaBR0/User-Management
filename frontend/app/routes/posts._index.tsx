import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const [posts, users] = await Promise.all([
    fetch("http://localhost:3000/posts").then((res) => res.json()),
    fetch("http://localhost:3000/users").then((res) => res.json()),
  ]);
  return json({ posts, users });
}

export default function Posts() {
  const { posts, users } = useLoaderData<typeof loader>();
  const [newPost, setNewPost] = useState({ title: "", content: "", authorId: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newPost,
        authorId: parseInt(newPost.authorId),
      }),
    });
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md h-32"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <select
              value={newPost.authorId}
              onChange={(e) => setNewPost({ ...newPost, authorId: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select an author</option>
              {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Post
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Post List</h2>
        <div className="grid gap-4">
          {posts.map((post: any) => {
            const author = users.find((u: any) => u.id === post.authorId);
            return (
              <div
                key={post.id}
                className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-medium text-lg">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Author: {author?.name || "Unknown"}</p>
                  <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
