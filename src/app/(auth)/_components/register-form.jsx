"use client";

import { Button, Input } from "@heroui/react";
import React, { useActionState } from "react";
import registerAction from "../_action/register-action";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  return (
    <form className="space-y-4 w-full md:w-2/3" action={formAction}>
      <div className="space-y-1">
        <label className="font-semibold" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          isRequired
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          isRequired
          placeholder="johndoe@email.com"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
          isRequired
        />
      </div>
      <Button
        type="submit"
        color="primary"
        className="w-full bg-red-500"
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
