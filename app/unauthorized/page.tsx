import Link from "next/link";
import { ShieldX, ArrowLeft, LayoutDashboard } from "lucide-react";

export const metadata = {
  title: "Access Denied | Yariga",
  description: "You do not have permission to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10">
          <ShieldX className="size-10 text-destructive" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Access Denied
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You don't have permission
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
          Sorry, your account doesn't have the required permissions to access
          this page. Please contact your administrator if you believe this is a
          mistake.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Login
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LayoutDashboard className="mr-2 size-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
