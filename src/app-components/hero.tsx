import Link from "next/link";
import React from "react";

type Props = {};

function HeroSection({}: Props) {
  return (
    <section className="w-full py-12 md:pb-24 lg:pb-32 xl:pb-48 pt-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Revolutionize{" "}
                <span className="text-primary">
                  Intelligent Knowledge Acquisition
                </span>{" "}
                in Africa and Beyond
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our AI-powered edtech platform empowers learners to unlock their
                full potential through personalized, adaptive learning
                experiences.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/auth/sign-up"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src="https://cdn.dribbble.com/userupload/13454253/file/original-b5a8c81733602189895e7a68eaea4764.jpg"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square w-[550px] h-[550px]"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
