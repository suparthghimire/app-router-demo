import { GetUsers } from "@/lib/api";
import { T_User } from "@/model/user";
import Link from "next/link";
import React from "react";

const UserPage: React.FC = async () => {
  const allUsers = await GetUsers();

  console.log(allUsers);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allUsers.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: T_User }> = (props) => {
  return (
    <Link href={`/users/${props.user.id}`}>
      <div className="flex flex-col items-center justify-center gap-2 p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800">
        <h2 className="text-xl font-bold">{props.user.name}</h2>
        <p className="text-lg">{props.user.email}</p>
      </div>
    </Link>
  );
};

export default UserPage;
