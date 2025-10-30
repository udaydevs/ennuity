"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SignUpForm from "@/components/signup";
import SignInForm from "@/components/signin";
export default function Page() {
  const [activeForm, setActiveForm] = useState<"signup" | "signin">("signup");

  return (
    <div className="relative w-full flex justify-center items-center h-screen overflow-hidden">
      <Image
        src="https://framerusercontent.com/images/mIs3Fk4rQo6RbnLoVR28wQRzfhg.png"
        alt="Background"
        fill
        className="object-fill scale-105 absolute inset-0 z-[-1] rotate-180"
        priority
      />

      <div className="relative z-10 lg:h-[60%] bg-[#191919] backdrop-blur-lg border border-white/20 shadow-lg mx-auto w-full max-w-md rounded-4xl p-4 md:p-8 max-sm:mx-3 dark:bg-black/60">
        <div className="w-fit px-1 h-fit py-1 mb-4 rounded-4xl bg-black">
          <button
            onClick={() => setActiveForm("signup")}
            className={cn(
              "text-white text-sm font-bold rounded-4xl py-4 px-6 mr-2 transition-all",
              activeForm === "signup" ? "bg-[#191919]" : "bg-transparent"
            )}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveForm("signin")}
            className={cn(
              "text-white text-sm font-bold rounded-4xl py-4 px-6 ml-2 transition-all",
              activeForm === "signin" ? "bg-[#191919]" : "bg-transparent"
            )}
          >
            Sign In
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-white dark:text-neutral-200">
          {activeForm === "signup" ? "Create an account" : "Welcome back"}
        </h2>
        <div className="flex flex-col justify-center ">
          {activeForm === "signup" ? <SignUpForm setActiveForm={setActiveForm} /> : <SignInForm setActiveForm={setActiveForm} />}
        </div>   
        


        <div className="my-2 h-0.5 w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <p className="text-[13px] my-4 text-center font-light text-white dark:text-neutral-200">
          By creating an account, you agree to our Terms & Service
        </p>
      </div>
    </div>
  );
}
