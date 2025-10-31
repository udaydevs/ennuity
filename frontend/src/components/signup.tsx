"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

interface SignUpFormProps {
  setActiveForm: (formName: "signup" | "signin") => void;
}

export default function SignUpForm({ setActiveForm }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }   
     
    const payload = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/account/SignUp/", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success(response.data.msg || "User created successfully!", { duration: 8000 });
      setActiveForm("signin")
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.msg || "Something went wrong.", { duration: 8000 });
      } else {
        toast.error("Unable to reach the server.", { duration: 8000 });
      }
    }
  };

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            type="text"
          />
        </LabelInputContainer>
      </div>

      <LabelInputContainer className="mb-2">
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
      </LabelInputContainer>

      <LabelInputContainer className="mb-2">
        <Input
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
      </LabelInputContainer>

      <LabelInputContainer className="mb-6">
        <Input
          id="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
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

    </form>
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
