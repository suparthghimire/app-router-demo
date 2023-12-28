import Link from "next/link";
import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "All User Page",
  description: "All User Page",
};

const UserPageLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <>
      <header className="flex items-center justify-between border-b border-neutral-700 p-2">
        <Link href="/">
          <h1 className="text-xl font-bold">App Name</h1>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/users">
            <button className="p-2 bg-amber-700 rounded-lg">All Users</button>
          </Link>
          <Link href="/users/create">
            <button className="p-2 bg-amber-700 rounded-lg">Create User</button>
          </Link>
        </nav>
      </header>
      <main className="p-2">{props.children}</main>
    </>
  );
};

export default UserPageLayout;
