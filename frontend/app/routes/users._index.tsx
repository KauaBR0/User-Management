import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await fetch("http://localhost:3000/users").then((res) =>
    res.json()
  );
  return json({ users });
}

export default function Users() {
  const { users } = useLoaderData<typeof loader>();
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <div className="grid gap-4">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
