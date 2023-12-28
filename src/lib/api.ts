import { T_User } from "@/model/user";
import { keys_prefixes, redis } from "./redis";

export const GetUsers = async () => {
  const allUserIds = await redis.keys(keys_prefixes.USER + "*");

  const users = (await Promise.all(
    allUserIds
      .map((userId) => {
        return redis.get(userId);
      })
      .filter((user) => user !== null)
  )) as string[];
  return users.map((user) => JSON.parse(user)) as T_User[];
};

export const GetSingleUser = async (id: string) => {
  const user = await redis.get(keys_prefixes.USER + id);
  return user ? (JSON.parse(user) as T_User) : null;
};

export const CreateUser = async (user: T_User) => {
  const id = user.id;
  const status = await redis.set(keys_prefixes.USER + id, JSON.stringify(user));
  if (status === "OK") {
    return user;
  } else throw new Error("Error creating user");
};
