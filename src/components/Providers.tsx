"use client";
import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "./PosthogProvider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <SessionProvider>
        <PostHogProvider>{children}</PostHogProvider>
      </SessionProvider>
      <Toaster />
    </LazyMotion>
  );
};

export default Providers;
