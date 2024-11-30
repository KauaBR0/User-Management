import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Hono + Remix App" },
    { name: "description", content: "Posts Crud App" },
  ];
};

export default function Index() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Posts Crud App</h1>

      <p className="text-lg text-gray-600 mb-8">
        full-stack application built with Hono.js backend and Remix frontend.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/users"
          className="block p-6 border rounded-lg hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">
            Manage users in the system. Create new users and view existing ones.
          </p>
        </Link>

        <Link
          to="/posts"
          className="block p-6 border rounded-lg hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">Posts</h2>
          <p className="text-gray-600">
            Create and view posts. Each post is associated with a user.
          </p>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-white shadow-lg border border-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Backend: Hono.js with TypeScript</li>
          <li>Database: PostgreSQL with Drizzle ORM</li>
          <li>Frontend: Remix with React</li>
          <li>Styling: Tailwind CSS</li>
        </ul>
      </div>
    </div>
  );
}
