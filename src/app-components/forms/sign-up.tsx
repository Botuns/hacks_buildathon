import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <div className="mx-auto max-w-md space-y-6 ">
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
            Enter your email and password to get started.✍️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Create account
          </Button>
          <p className="text-center underline text-primary cursor-pointer">
            Already signed up?
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
