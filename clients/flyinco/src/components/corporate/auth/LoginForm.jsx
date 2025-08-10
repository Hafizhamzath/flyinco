import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom"; // react-router navigation

import { Button } from "../../UI/button"; // adjust paths as needed
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../UI/form";
import { Input } from "../../UI/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../UI/Card";
import { LogIn } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    // TODO: Replace with real authentication logic
    // For now, just redirect to Home page on submit
    navigate("/");
  }

  // Navigate to Admin page on button click
  function goToAdmin() {
    navigate("/admin");
  }

  return (
    <Card className="shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
        <CardDescription>Sign in to access your account and bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>
        </Form>

        {/* Admin button below the form */}
        <div className="mt-4 text-center">
          <button
            onClick={goToAdmin}
            className="text-sm text-white bg-gray-700 hover:bg-gray-800 rounded px-3 py-1"
            type="button"
          >
            Admin
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
