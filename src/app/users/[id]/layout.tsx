import { GetSingleUser } from "@/lib/api";
import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

type T_Props = PropsWithChildren & {
  params: { id: string };
};

export const generateMetadata = async (props: T_Props): Promise<Metadata> => {
  const singleUser = await GetSingleUser(props.params.id);
  if (!singleUser) {
    return {
      title: "Not Found | App Name",
      description: "User not found",
    };
  }
  return {
    title: `${singleUser.name} | App Name`,
    description: "Single User Page",
  };
};

const SingleUserPagelayout: React.FC<T_Props> = (props) => {
  return <div>{props.children}</div>;
};

export default SingleUserPagelayout;
