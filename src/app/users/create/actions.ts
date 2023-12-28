"use server";
import { v4 as uuidv4 } from "uuid";
import { CreateUser } from "@/lib/api";
import { redirect } from "next/navigation";

export async function ActionCreateUser(formData: FormData) {
  "use server";

  const name = (formData.get("name") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const id = uuidv4();

  const createUser = await CreateUser({ id, name, email });

  if (createUser) {
    redirect(`/users/${createUser.id}`);
  }
}
