import { GetSingleUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";

type T_Props = {
  params: {
    id: string;
  };
};

const SingleUserPage: React.FC<T_Props> = async (props) => {
  const user = await GetSingleUser(props.params.id);

  if (!user) throw new Error("User not found");

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-lg">{user.email}</p>
    </div>
  );
};

export default SingleUserPage;
