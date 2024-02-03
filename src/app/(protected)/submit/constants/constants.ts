import { z } from "zod";

export const submitResourceForm = z.object({
  title: z.string().min(1, "This field is required"),
  slug: z
    .string()
    .min(1, "This field is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid Slug"),
  description: z.string().optional(),
  link: z.string().min(1, "This field is required").url("Invalid URL"),
  categoryId: z.string().min(1, "This field is required"),
  thumbnailPath: z.string().optional(),
});
