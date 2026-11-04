import type { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "@/app/components/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your account and get started.",
};

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <RegisterForm />
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