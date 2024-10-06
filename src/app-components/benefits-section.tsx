import React from "react";

const BenefitsSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Benefits
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Empower Your Learning Journey with EduIfa
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              EduIfa offers a comprehensive suite of tools and features designed
              to support and enhance your educational experience, making
              learning more accessible, engaging, and effective.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <img
            src="https://cdn.dribbble.com/userupload/2897948/file/original-6102b989c5f9830bbfb5f83eb87f83df.jpg"
            width="550"
            height="310"
            alt="Empower Your Learning Journey"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last w-[550px] h-[310px]"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Personalized Learning</h3>
                  <p className="text-muted-foreground">
                    Tailored study plans, adaptive quizzes, and customizable
                    learning paths to suit your individual needs and progress.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Comprehensive Resources</h3>
                  <p className="text-muted-foreground">
                    Access to a vast array of educational resources, AI-powered
                    search, and online libraries, all at your fingertips.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Engage with interactive AI-based lectures, real-time Q&A
                    sessions, and AI tutors that make learning more engaging and
                    effective.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
