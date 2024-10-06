import React from "react";
import {
  GraduationCap,
  BookOpen,
  ListChecks,
  Monitor,
  Pencil,
  ShieldCheck,
  Mic,
  Lightbulb,
  FileText,
  Camera,
  Users,
  Settings,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Personalized Study Assistance",
    description:
      "Tailored study plans, customizable learning paths, and adaptive quizzes based on individual student needs.",
    icon: <GraduationCap className="text-primary" size={32} />,
  },
  {
    title: "Information Access",
    description:
      "Quick access to educational resources with an AI-powered search engine, YouTube recommendations, and online libraries.",
    icon: <BookOpen className="text-primary" size={32} />,
  },
  {
    title: "Project and Assignment Support",
    description:
      "Project planning tools, templates, and AI assistance for brainstorming, research, and content creation.",
    icon: <ListChecks className="text-primary" size={32} />,
  },
  {
    title: "AI-Based Lectures and Tutorials",
    description:
      "Interactive AI lectures, Q&A sessions, and recorded tutorials for self-paced learning.",
    icon: <Monitor className="text-primary" size={32} />,
  },
  {
    title: "Exam Preparation",
    description:
      "Comprehensive materials, AI-generated practice questions, and performance tracking to identify strengths and weaknesses.",
    icon: <Pencil className="text-primary" size={32} />,
  },
  {
    title: "AI-Based Exams",
    description:
      "Secure online exams with real-time proctoring, immediate grading, and robust cheating prevention.",
    icon: <ShieldCheck className="text-primary" size={32} />,
  },
  {
    title: "AI Voice Tutor",
    description:
      "Interactive voice tutor with multilingual support, providing personalized feedback and guidance.",
    icon: <Mic className="text-primary" size={32} />,
  },
  {
    title: "Explainers and Educational Content",
    description:
      "AI-generated explainers, visual aids, animations, and customizable content formats for better understanding.",
    icon: <Lightbulb className="text-primary" size={32} />,
  },
  {
    title: "PDF Analysis and Question Asking",
    description:
      "Upload PDFs for content analysis, AI Q&A sessions, summarization, and highlighting of key points.",
    icon: <FileText className="text-primary" size={32} />,
  },
  {
    title: "Photo Upload and Answer Retrieval",
    description:
      "Upload photos of homework, assignments, or textbook pages for AI analysis and accurate answers.",
    icon: <Camera className="text-primary" size={32} />,
  },
  {
    title: "Study Groups and Mentorship",
    description:
      "Collaborative study groups, AI mentors, and access to real teachers and mentors for personalized guidance.",
    icon: <Users className="text-primary" size={32} />,
  },
  {
    title: "Additional Features",
    description:
      "Notifications, gamification, customizable profiles, and more to enhance the learning experience.",
    icon: <Settings className="text-primary" size={32} />,
  },
];

const KeyFeatures: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Unlock Your Learning Potential
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how EduIfa&apos;s advanced AI-powered features can
              revolutionize your learning experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group grid gap-3 p-4 transition-transform duration-200 hover:-translate-y-2 bg-card rounded-lg shadow-lg"
            >
              <div>{feature.icon}</div>
              <h3 className="text-lg font-bold group-hover:text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
