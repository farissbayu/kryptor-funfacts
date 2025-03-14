import { Logo } from "@/components/logo";
import React from "react";

export default function Page() {
  return (
    <div className="p-8 w-5/6 border-2 border-red-400 rounded-md md:my-32 mt-60">
      <h1 className="text-xl font-semibold">
        <Logo />
      </h1>

      <div className="mt-4 space-y-4">
        <p>
          <strong>Discover Fun Facts Tailored for You!</strong>
        </p>
        <p>
          Welcome to <strong>FunFact</strong>, the ultimate digital platform
          where curiosity meets entertainment! We bring you an endless stream of
          fascinating, AI-generated fun facts based on your interests. Whether
          you're here to kill time, learn something new, or impress your friends
          with trivia, we’ve got you covered!
        </p>

        <h2 className="text-lg font-semibold">What We Offer</h2>
        <p>
          <strong>🔑 Seamless Access</strong>
          <br />
          Getting started is easy! Sign up with your email or log in with Google
          to personalize your experience and access a world of intriguing facts.
        </p>
        <p>
          <strong>🎯 Personalized Content</strong>
          <br />
          Your interests, your facts! Choose topics you love, and our AI will
          generate an infinite supply of fun and engaging content just for you.
        </p>

        <p>
          <strong>📌 Save Your Favorites</strong>
          <br />
          Bookmark the coolest and funniest facts so you can revisit them
          anytime.
        </p>

        <h2 className="text-lg font-semibold">Our Mission</h2>
        <p>
          At <strong>FunFact</strong>, we believe learning should be fun,
          effortless, and accessible to everyone. Our goal is to keep you
          entertained while expanding your knowledge, one fun fact at a time!
        </p>

        <hr className="my-4" />
        <p>
          Start exploring today and make every moment a learning opportunity!
        </p>
      </div>
    </div>
  );
}
