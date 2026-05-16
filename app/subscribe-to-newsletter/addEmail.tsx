"use client";

import { subscribeToNewsletter } from "./actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { UTMSource } from "./types";

const validateEmail = (input: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(input);
};

export default function AddEmail({
  source,
  campaign,
}: {
  source: UTMSource;
  campaign: string;
}) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmitEmail = () => {
    startTransition(async () => {
      if (!validateEmail(email)) {
        toast.error("Enter Valid Email Address");
        return;
      }
      const response = await subscribeToNewsletter({ email, source, campaign });
      if (response.success) {
        toast.success(response.message || "Success");
        setEmail("");
      } else {
        toast.error(response.message || "Error");
      }
    });
  };
  return (
    <div className="w-full flex justify-center gap-8">
      <input
        className="bg-white h-12 w-1/2 rounded-2xl text-black px-4 text-xl outline-yellow-300"
        placeholder="Enter your valid email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button
        onClick={handleSubmitEmail}
        disabled={isPending}
        className="cursor-pointer bg-yellow-300 text-black px-12 rounded-2xl hover:bg-yellow-400 active:bg-yellow-500"
      >
        Subscribe
      </button>
    </div>
  );
}
