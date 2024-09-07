"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  class: z.string(),
});

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      class: "Not Applicable",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.error || "Failed to register");
        toast.error(errorData.error || "Failed to register");
      }

      const userData = await response.json();
      console.log("User registered:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard"); 
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    }
  }

  return (
    <div className="mx-auto max-w-[90%] space-y-6">
      <Toaster richColors />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-primary">Eduifa</span>!
        </h1>
        <p className="text-muted-foreground">
          Let&apos;s get you set up with an account.
        </p>
      </div>
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-center">Create your account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started.✍️
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Not Applicable">
                          Not Applicable
                        </SelectItem>
                        <SelectItem value="1st Grade">1st Grade</SelectItem>
                        <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                        <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                        <SelectItem value="4th Grade">4th Grade</SelectItem>
                        <SelectItem value="5th Grade">5th Grade</SelectItem>
                        <SelectItem value="6th Grade">6th Grade</SelectItem>
                        <SelectItem value="7th Grade">7th Grade</SelectItem>
                        <SelectItem value="8th Grade">8th Grade</SelectItem>
                        <SelectItem value="9th Grade">9th Grade</SelectItem>
                        <SelectItem value="10th Grade">10th Grade</SelectItem>
                        <SelectItem value="11th Grade">11th Grade</SelectItem>
                        <SelectItem value="12th Grade">12th Grade</SelectItem>
                        <SelectItem value="College Grade">
                          College Grade
                        </SelectItem>
                        <SelectItem value="University Grade">
                          University Grade
                        </SelectItem>
                        <SelectItem value="Graduate Grade">
                          Graduate Grade
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
              <p className="text-center underline text-primary cursor-pointer">
                Already signed up?
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
