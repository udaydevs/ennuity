"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner"; 
import api, { getCSRFToken }  from '@/api/ApiInstance';

interface SignUpFormProps {
  setActiveForm: (formName: "signup" | "signin") => void;
}

export default function SignInForm({ setActiveForm }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setIsLoading(true);
    try {
      const token = await getCSRFToken();
    api.defaults.headers.common['X-CSRFToken'] = token;
      const response = await api.post("/account/SignIn/", formData);
      toast.success(response.data.msg || "Login successful!", { duration: 8000 });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.msg)
        toast.error(error.response.data.msg || "Invalid Credentials", { duration: 5000 });
      } else {
        toast.error("Unable to reach the server.", { duration: 8000 });
      }
    } finally {
      setIsLoading(false); 
    }
  }; 

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-2">
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="projectmayhem@fc.com"
          type="email"
        />
      </LabelInputContainer>

      <LabelInputContainer className="mb-6">
        <Input
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          type="password"
        />
      </LabelInputContainer>

      <button
        className={cn(
            "group/btn relative block h-12 w-full bg-[#6836f2] rounded-md font-bold text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset transition-all",
            isLoading && "bg-gray-500 cursor-not-allowed" 
        )}
        type="submit"
        disabled={isLoading}
      >
        {/* Optional: Show loading text */}
        {isLoading ? 'Processing...' : 'Sign In \u2192'}
        <BottomGradient />
      </button>

      {/* Optional: Sign Up button using the prop */}
      <p className="mt-4 text-center text-sm text-white/70">
          Don't have an account? 
          <button 
            type="button" 
            // This is how you use the prop to switch the form
            onClick={() => setActiveForm("signup")} 
            className="ml-1 font-bold text-[#6836f2] hover:underline"
          >
            Sign Up
          </button>
      </p>

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

