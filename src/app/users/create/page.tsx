"use client";
import { CreateUser } from "@/lib/api";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ActionCreateUser } from "./actions";
import { ZodError, z } from "zod";

const UserSchema = z.object({
  name: z.string().min(3, "Name too short"),
  email: z.string().email("Invalid email"),
});

type T_UserSchema = z.infer<typeof UserSchema>;

const UserCreatePage = () => {
  const [errors, setErrors] = React.useState<T_UserSchema>({
    name: "",
    email: "",
  });

  const [loading, setLoading] = React.useState(false);
  const handleSubmitAction = async (formData: FormData) => {
    setLoading(true);

    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      UserSchema.parse(newUser);
      await ActionCreateUser(formData);
      setLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.formErrors.fieldErrors;
        if (errors.name) {
          const error = errors.name[0];
          setErrors((pv) => ({ ...pv, name: error }));
        }

        if (errors.email) {
          const error = errors.email[0];
          setErrors((pv) => ({ ...pv, email: error }));
        }
        setLoading(false);
      }
    }
  };

  return (
    <form action={handleSubmitAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          className="text-black order border-neutral-700 rounded-lg p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="johndoe@gmail.com"
          className="text-black border border-neutral-700 rounded-lg p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <button
        type="submit"
        className="p-2 bg-amber-700 rounded-lg w-fit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Create User"}
      </button>
    </form>
  );
};

export default UserCreatePage;
