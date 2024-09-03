"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { serialize } from "next-mdx-remote/serialize";
import { Loader } from "rsuite";
import { useForm } from "react-hook-form";
import { searchYouTube } from "../../../../services/youtube-query-helper";
import { toast, Toaster } from "sonner";
import { extractVideoUrlsAndDescriptions } from "@/app/helpers/extract-youtube-response";
import { searchImages } from "../../../../services/image-search-helper";
import { extractImageInfo } from "@/app/helpers/extract-image-response";
import { refined_learn_generator_prompt } from "@/app/helpers/learn_generator_prompt";
import { OpenAiGpt } from "../../../../services/gpt";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  suggestVideos: z.boolean().default(false),
  understandingLevel: z.enum([
    "no-knowledge",
    "some-understanding",
    "need-advanced",
  ]),
  difficultyLevel: z.enum(["university", "primary", "secondary", "normal"]),
});

export default function LearningRequest() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      suggestVideos: false,
      understandingLevel: undefined,
      difficultyLevel: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await searchYouTube(values.title);
      if (res.success) {
        const videos = extractVideoUrlsAndDescriptions(res.data);
        const img_res = await searchImages(values.title);
        if (img_res.success) {
          //   console.log(img_res.data);
          const images = extractImageInfo(img_res.data.response.images);
          // console.log(images);
          const prompt = refined_learn_generator_prompt(values, videos, images);
          const open_ai_response = await OpenAiGpt(prompt);
          console.log(open_ai_response);
          // const serializedContent = await serialize(open_ai_response);

          // localStorage.setItem("mdxContent", JSON.stringify(serializedContent));
          toast.success("Learning content generated successfully");
          // router.push(`/dashboard/learn/${"14567gfdcbvsdyt"}`);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
    }
  }

  return (
    <Card className="w-full h-full">
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>What do you want to learn 🤔?</CardTitle>
            <CardDescription>
              Fill out the form below to let us know what you&apos;re interested
              in learning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title">Title</Label>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Enter the topic you want to learn"
                      {...field}
                      aria-autocomplete="both"
                      autoComplete="on"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="description">Description</Label>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe what you want to learn"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suggestVideos"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="suggest-videos">Suggest videos</Label>
                  </div>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="understandingLevel"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="understanding-level">
                      Current understanding level
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no-knowledge">
                          No knowledge
                        </SelectItem>
                        <SelectItem value="some-understanding">
                          I have a bit of understanding
                        </SelectItem>
                        <SelectItem value="need-advanced">
                          I need more advanced knowledge
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="difficulty-level">Difficulty level</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="ml-auto w-full "
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader
                  className="!text-white"
                  size="sm"
                  content="Generating..."
                  speed="slow"
                />
              ) : (
                "Generate your learning content"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
