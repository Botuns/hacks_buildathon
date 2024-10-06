"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      if (typeof window === "undefined") {
        return;
      }

      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).user.id : null;
      //   console.log("userId", userId);
      if (!userId) {
        router.push("/auth/sign-in");
        return;
      }

      try {
        const userData = user ? JSON.parse(user).user : null;
        // console.log("userData", userData);
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem("user");
          router.push("/auth/sign-in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/sign-in");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  return { user, loadingUser };
}
