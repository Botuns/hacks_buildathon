"use client";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import mdxComponents from "@/components/mdxComponents";
import { sourcesaple } from "@/lib/utils";
import { useParams } from "next/navigation";
import { getUserFromLocalStorage, User } from "@/app/helpers/user";
import { getCourse } from "@/app/helpers/queries";

const LessonModule = () => {
  const { id } = useParams();
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  async function fetchCourse(courseId: string) {
    const response = await getCourse(courseId);
    if (response.success) {
    }
  }
  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const savedMdxContent = localStorage.getItem("mdxContent") || "";

    async function fetchMdxContent() {
      setMdxSource(
        savedMdxContent
          ? JSON.parse(savedMdxContent)
          : await serialize(sourcesaple)
      );
    }
    fetchMdxContent();
  }, []);
  //   const Component = useMDXComponent();

  return (
    <div className="max-w-3xl mx-auto px-4">
      {mdxSource ? (
        <MDXRemote {...mdxSource} components={mdxComponents} />
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default LessonModule;
