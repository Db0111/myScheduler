"use client";

import { Button, Card, Form, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      userId,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card
        className="flex w-96 max-w-md h-full p-8 shadow-lg rounded-md"
        variant="bordered"
      >
        <Form onSubmit={handleLogin} className="flex flex-col space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            isRequired
            type="text"
            label="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full h-10 bg-lime-200 rounded-md"
            variant="shadow"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
