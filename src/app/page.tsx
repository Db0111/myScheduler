"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("./signin");
  };
  const handleSignUp = () => {
    router.push("./signup");
  };
  return (
    <div>
      <main>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center">
              <h2>Title</h2>
            </CardHeader>
            <CardBody className="flex flex-row items-center justify-center">
              <Button
                className="w-24 h-10 bg-lime-200 rounded-md"
                onPress={handleLogin}
              >
                Login
              </Button>
              <Button
                className="w-24 h-10 bg-lime-200 rounded-md"
                onPress={handleSignUp}
              >
                Sign Up
              </Button>
            </CardBody>
            <CardFooter>
              <p>Footer content</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
