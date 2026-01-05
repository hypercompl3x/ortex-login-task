import * as z from "zod";
import { ERROR_MESSAGES } from "./constants";

const { EMAIL, PASSWORD } = ERROR_MESSAGES.AUTH;

export const UserSchema = z.object({
  email: z
    .string()
    .min(1, EMAIL.REQUIRED)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, PASSWORD.REQUIRED),
});
