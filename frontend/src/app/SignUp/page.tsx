"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // ✅ Map frontend fields to backend format
    const payload = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/SignUp/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.msg, {
        'duration': 5000, // stays for 10 seconds
      });
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.msg || "Something went wrong.", {
        'duration': 5000, // stays for 10 seconds
      })
      } else {
        toast.error("Unable to reach the server.", {
        'duration': 5000, // stays for 10 seconds
      });
      }
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center h-screen overflow-hidden">
      <Image
        src="https://framerusercontent.com/images/mIs3Fk4rQo6RbnLoVR28wQRzfhg.png"
        alt="Background"
        fill
        className="object-fill scale-105 absolute inset-0 z-[-1] rotate-180"
        priority
      />

      <div className="relative z-10 bg-[#191919] backdrop-blur-lg border border-white/20 shadow-lg mx-auto w-full max-w-md rounded-4xl p-4 md:p-8 dark:bg-black/60">
        <div className="w-fit px-1 h-fit py-1 mb-4 rounded-4xl bg-black">
          <button className="text-white text-sm font-bold bg-[#191919] rounded-4xl py-4 px-6 mr-2">
            Sign Up
          </button>
          <button className="text-white text-sm font-bold rounded-4xl py-4 px-6 ml-2">
            Sign In
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-white dark:text-neutral-200">
          Create an account
        </h2>

        <form className="my-3" onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Durden"
                type="text"
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-2">
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-2">
            <Input
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-6">
            <Input
              id="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-12 w-full bg-[#6836f2] rounded-md font-bold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Create an account &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-0.5 w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>

        <p className="text-[13px] text-center font-light text-white dark:text-neutral-200">
          By creating an account, you agree to our Terms & Service
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-white to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-gray-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
