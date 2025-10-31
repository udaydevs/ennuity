"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SignUpForm from "@/components/signup";
import SignInForm from "@/components/signin";
import { motion } from "framer-motion";
export default function Page() {
  const [activeForm, setActiveForm] = useState<"signup" | "signin">("signup");
  const mode = useSearchParams().get("mode");
  useEffect(() => {
    if (mode === "signin" || mode === "signup") setActiveForm(mode);
  }, [mode]);
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
        <div className="relative flex w-fit mb-6 h-[12%] rounded-4xl bg-black py-0.5  px-1overflow-hidden">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "absolute top-1 bottom-1 p-1  rounded-3xl bg-[#191919]",
              activeForm === "signup"
                ? "left-1 w-[calc(50%-0.6rem)]" // default
                : "left-[calc((50%+0.7rem))] w-[calc((50%-0.7rem)-3px)]"
            )}
          />

          <div className="relative flex z-10 mx-1">
            <button
              onClick={() => setActiveForm("signup")}
              className={cn(
                "text-white text-[16px] font-bold py-3 px-8 rounded-3xl transition-colors duration-300",
                activeForm === "signup" ? "text-white" : "text-gray-400"
              )}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveForm("signin")}
              className={cn(
                "text-white text-[16px] font-bold py-3 px-8  rounded-3xl transition-colors duration-300",
                activeForm === "signin" ? "text-white" : "text-gray-400"
              )}
            >
              Sign In
            </button>
          </div>
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
