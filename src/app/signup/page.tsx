"use client";

import React from "react";
import { Form, Input, Button, Card } from "@nextui-org/react";

export default function SignUp() {
  const [submitted, setSubmitted] = React.useState(null);
  const [error, setError] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error || "Sign up failed");
        return;
      }

      const result = await res.json();
      setSubmitted(result);
      setError("");
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card
        className="flex w-96 max-w-md h-full p-8 shadow-lg rounded-md"
        variant="bordered"
      >
        <h1 className="text-center text-lg font-bold text-lime-700 mb-6">
          Sign Up
        </h1>
        <Form
          className="flex w-full flex-col space-y-4"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            errorMessage="Please enter your name"
            size="sm"
            label="Name"
            labelPlacement="inside"
            name="name"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid ID"
            label="ID"
            labelPlacement="inside"
            name="userId"
            type="text"
            size="sm"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid password"
            size="sm"
            label="Password"
            labelPlacement="inside"
            name="password"
            type="password"
          />
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            size="sm"
            label="Email"
            labelPlacement="inside"
            name="email"
            type="email"
          />
          <Button
            type="submit"
            className="w-full h-10 bg-lime-200 rounded-md"
            variant="shadow"
          >
            Sign Up
          </Button>
          {error && (
            <div className="text-sm text-red-500 text-center mt-4">{error}</div>
          )}
          {submitted && (
            <div className="text-sm text-default-500 text-center mt-4">
              Successfully signed up
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
}
