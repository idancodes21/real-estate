import LoginForm from "@/components/login-form";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <LoginForm />
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/auth.png"
          alt="Modern glass building"
          fill
          priority
          sizes="50vw"
          className="object-cover dark:brightness-75"
        />
      </div>
    </main>
  );
}