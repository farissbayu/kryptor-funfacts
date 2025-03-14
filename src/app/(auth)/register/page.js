import { Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";
import React from "react";
import RegisterForm from "../_components/register-form";
import { Logo } from "@/components/logo";

export default function Page() {
  return (
    <Card className="p-4 md:py-16 md:px-24 shadow-medium w-full md:w-1/2 mx-8">
      <CardHeader className="block text-center justify-center items-center space-y-3">
        <Logo />
        <h1 className="font-semibold text-lg md:text-xl">Register Here!</h1>
      </CardHeader>
      <CardBody className="flex items-center space-y-4">
        <RegisterForm />
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Log in
          </Link>{" "}
          here.
        </p>
      </CardBody>
    </Card>
  );
}
