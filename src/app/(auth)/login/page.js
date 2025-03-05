import { Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import LoginForm from "../_components/login-form";
import { ButtonOauthGoogle } from "../_components/button-oauth-google";

export default function Page() {
  return (
    <Card className="p-4 md:py-16 md:px-24 shadow-medium w-full md:w-1/2 mx-8">
      <CardHeader className="block text-center justify-center items-center space-y-3">
        <Logo />
        <h1 className="font-semibold text-lg md:text-xl">Login first!</h1>
      </CardHeader>
      <CardBody className="flex items-center space-y-4">
        <ButtonOauthGoogle />
        <hr className="w-full" />
        <LoginForm />
        <p className="text-sm">
          Doesn't have account yet?{" "}
          <Link href="/register" className="font-semibold hover:underline">
            Register
          </Link>{" "}
          here.
        </p>
      </CardBody>
    </Card>
  );
}
