"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

//function that accepts the type we are trying to validate
//without this type, the form trys to validate all the props behind the scenes even if we are
//only on the sign in page
const authFormSchema = (type: string) =>
  z.object({
    //both
    email: z.string().email(),
    password: z.string().min(8),

    //sign up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
  });

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setuser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //use form takes in a constant not a function, so we had to turn authFormSchema into a constant
  //because we turned it into a function
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      //Sign up with Appwrite and create a Plaid link token
      if (type === "sign-up") {
        //format the data
        const newUser = await signUp(values);
        setuser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        //if we get a response / response isn't null get sent to the home page
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {/*if we have a user, we can say link account and else if the type is equal to sign in then you can say "sign in"*/}
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details."}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/*PlaidLink*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/*if the type is sign up, then generate the sign up forms */}
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            First Name
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="Enter your first name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Last Name
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="Enter your last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">Address</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              className="input-class"
                              placeholder="Enter your specific address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">City</FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              className="input-class"
                              placeholder="Enter your specific city"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">State</FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="Example: CA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Postal Code
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="Example: 90249"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">
                            Date of Birth
                          </FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="yyyy-mm-dd"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ssn"
                      render={({ field }) => (
                        <div className="form-item">
                          <FormLabel className="form-label">SSN</FormLabel>
                          <div className="flex w-full flex-col">
                            <FormControl>
                              <Input
                                className="input-class"
                                placeholder="Example: 1234"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="form-message mt-2" />
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}
              {/*sign in forms*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Email</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          className="input-class"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Password</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          className="input-class"
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              {/*make sure to disable the button if it's loading*/}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
