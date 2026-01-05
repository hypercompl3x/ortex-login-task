import * as z from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatZodErrors(
  error: z.ZodError<{
    email: string;
    password: string;
  }>
) {
  const formattedErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!formattedErrors[path]) formattedErrors[path] = issue.message;
  }

  return formattedErrors;
}
