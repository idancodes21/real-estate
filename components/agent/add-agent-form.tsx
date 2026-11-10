"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { Loader2, UserRound } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createAgent,
  type AgentFormState,
} from "@/app/(dashboard)/agent/actions";
import { useRef, useState } from "react";
import { CloudUpload, ImagePlus, X } from "lucide-react";
import Image from "next/image";

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Bangladesh",
];

const inputClass =
  "h-11 rounded-lg border-input bg-card px-3 text-sm shadow-none placeholder:text-muted-foreground dark:bg-card";

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error?.[0] && <p className="text-xs text-destructive">{error[0]}</p>}
    </div>
  );
}

const initialState: AgentFormState = {};

export default function AddAgentForm() {
  const [state, formAction, isPending] = useActionState(
    createAgent,
    initialState,
  );

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(file?: File) {
    if (!file) return;

    setSelectedFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file || !fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInputRef.current.files = dataTransfer.files;

    handleFileChange(file);
  }

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  return (
    <form action={formAction} className="overflow-hidden rounded-xl bg-card">
      {/* Banner (swap for a Figma export later) */}
      <div className="h-40 bg-linear-to-br from-fuchsia-400 via-blue-600 to-cyan-400 sm:h-[170px]" />

      <div className="px-5 pb-8 sm:px-6">
        {/* Avatar + actions */}
        <div className="flex items-start justify-between">
          <div className="-mt-10 flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-muted text-muted-foreground">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Agent profile preview"
                width={80}
                height={80}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-8" />
            )}
          </div>

          <div className="flex items-center gap-2 pt-3">
            <Link
              href="/agent"
              className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending && <Loader2 className="mr-2 size-3 animate-spin" />}
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <h2 className="mt-4 text-base font-semibold text-foreground">
          My details
        </h2>

        {state.message && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.message}
          </div>
        )}

        <div className="mt-5 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          <Field
            label="First name"
            htmlFor="firstName"
            error={errors.firstName}
          >
            <Input
              id="firstName"
              name="firstName"
              placeholder="Jobanne"
              defaultValue={values.firstName}
              autoComplete="given-name"
              className={inputClass}
            />
          </Field>

          <Field label="Last name" htmlFor="lastName" error={errors.lastName}>
            <Input
              id="lastName"
              name="lastName"
              placeholder="James"
              defaultValue={values.lastName}
              autoComplete="family-name"
              className={inputClass}
            />
          </Field>

          <Field label="Phone" htmlFor="phone" error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+123 456 7890"
              defaultValue={values.phone}
              autoComplete="tel"
              className={inputClass}
            />
          </Field>

          <Field
            label="Date of Birth"
            htmlFor="dateOfBirth"
            error={errors.dateOfBirth}
          >
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              defaultValue={values.dateOfBirth}
              className={inputClass}
            />
          </Field>

          <Field label="Gender" htmlFor="gender" error={errors.gender}>
            <select
              id="gender"
              name="gender"
              defaultValue={values.gender ?? ""}
              className={selectClass}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </Field>

          <Field label="Email" htmlFor="email" error={errors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="agent@example.com"
              defaultValue={values.email}
              autoComplete="email"
              className={inputClass}
            />
          </Field>

          <Field label="Country" htmlFor="country" error={errors.country}>
            <select
              id="country"
              name="country"
              defaultValue={values.country ?? ""}
              className={selectClass}
            >
              <option value="" disabled>
                Select country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="flex min-h-[75px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-input bg-card px-4 py-3 transition-colors hover:border-primary/50 hover:bg-accent/30 mt-5"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="avatar"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />

          {selectedFile ? (
            <div className="flex items-center gap-2">
              <ImagePlus className="size-5 shrink-0 text-primary" />

              <span className="max-w-[220px] truncate text-xs text-foreground">
                {selectedFile.name}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex size-9 items-center justify-center rounded-full bg-accent">
                <CloudUpload className="size-[18px] text-primary" />
              </div>

              <div className="space-y-1 text-center">
                <p className="text-[11px] text-muted-foreground">
                  Click to upload or drag and drop
                </p>

                <p className="text-[10px] text-muted-foreground">
                  PNG, JPG or WebP (max. 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
