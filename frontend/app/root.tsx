import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
  Link
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  // We only need the tailwind.css import above, no need for additional stylesheet links
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/users" className="hover:text-gray-300">Users</Link>
            <Link to="/posts" className="hover:text-gray-300">Posts</Link>
          </div>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
