"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Background } from "@/components/ui/background";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="relative w-full flex justify-center items-center h-screen bg-black overflow-hidden">
                <Background />

          <div className="relative z-10 bg-transparent shadow-input mx-auto w-full max-w-md rounded-2xl bg-black p-4 md:rounded-2xl  border-amber-50 border-[0.5px] md:p-8 dark:bg-black">
              <h2 className="text-xl font-bold text-[#e5e4e0] dark:text-neutral-200">
                  Welcome to Ennuity
              </h2>
              {/* <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to ennuity if you can because we don&apos;t have a login flow
        yet
      </p> */}

              <form className="my-8" onSubmit={handleSubmit}>
                  <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                      <LabelInputContainer>
                          <Label htmlFor="firstname">First name</Label>
                          <Input id="firstname" placeholder="Tyler" type="text" />
                      </LabelInputContainer>
                      <LabelInputContainer>
                          <Label htmlFor="lastname" >Last name</Label>
                          <Input id="lastname" placeholder="Durden" type="text"/>
                      </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-4">
                      <Label htmlFor="email" >Email Address</Label>
                      <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                      <Label htmlFor="password" >Password</Label>
                      <Input id="password" placeholder="••••••••" type="password"  />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-8">
                      <Label htmlFor="twitterpassword" >Your twitter password</Label>
                      <Input
                          id="twitterpassword"
                          placeholder="••••••••"
                          type="twitterpassword"
                      />
                  </LabelInputContainer>

                  <button
                      className="group/btn relative block h-10 w-full rounded-md bg-white   font-medium text-black shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                      type="submit"
                  >
                      Sign up &rarr;
                      <BottomGradient />
                  </button>

                  <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              </form>
          </div>
            </div>

  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full  flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
