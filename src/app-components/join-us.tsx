import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

type Props = {};

function JoinUs({}: Props) {
  return (
    <div className="p-[2%]">
      <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-[3rem] ">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join the Learning Revolution
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sign up today and unlock your full potential with our AI-powered
              edtech platform.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
              />
              <Button type="submit">Get Started</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-2"
                prefetch={false}
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JoinUs;
