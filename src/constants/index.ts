import { z } from "zod";

export const usernameFieldSchema = z.string().min(1, "This field is required").regex(/^[a-zA-Z0-9_-]{3,30}$/, "Invalid username")
