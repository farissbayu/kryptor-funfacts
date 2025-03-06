"use client";

import { Button, Input } from "@heroui/react";
import { useActionState } from "react";
import loginAction from "../_action/login-action";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form className="space-y-4 w-full md:w-2/3" action={formAction}>
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
        Login
      </Button>
      {!state?.status && (
        <p className="text-xs text-red-500 text-center">{state?.message}</p>
      )}
    </form>
  );
}
