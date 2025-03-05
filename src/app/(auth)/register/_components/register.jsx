"use client";

import { Button, Input } from "@heroui/react";
import React, { useActionState } from "react";
import registerAction from "../action/action";

export default function RegiterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  return (
    <form className="space-y-5" action={formAction}>
      <h3 className="font-semibold">Name</h3>
      <Input name="name" type="text" isRequired />
      <h3 className="font-semibold">Email</h3>
      <Input name="email" type="email" isRequired />
      <h3 className="font-semibold">Password</h3>
      <Input name="password" type="password" placeholder="******" />
      <Button
        type="submit"
        color="primary"
        className="w-full"
        isDisabled={pending}
      >
        Register
      </Button>
      {!state?.status && (
        <p className="text-xs text-red-500 text-center my-2">
          {state?.message}
        </p>
      )}
    </form>
  );
}
