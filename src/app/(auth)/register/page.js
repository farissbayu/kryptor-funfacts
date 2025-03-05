import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import RegiterForm from "./_components/register";

export default function page() {
  return (
    <div className="flex p-10 items-center justify-center text-center">
      <Card className="p-10 space-y-4 shadow-medium w-96">
        <CardHeader className="block text-center justify-center items-center space-y-3">
          <div className="flex justify-center ">
            <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
              <path
                clipRule="evenodd"
                d="M16 4L10 12H14V18L20 10H16V4Z"
                fill="currentColor"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M22 12L16 20H20V26L26 18H22V12Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <h3 className="font-bold text-5xl bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text">
              .FunFact
            </h3>
          </div>

          <h1 className="font-semibold text-xl">Register Here!</h1>
        </CardHeader>
        <CardBody className="">
          <div className="space-y-4">
            <RegiterForm />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
