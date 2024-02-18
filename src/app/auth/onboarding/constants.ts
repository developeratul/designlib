import { usernameFieldSchema } from "@/constants";
import { z } from "zod";

export const onboardingFormSchema = z.object({
  username: usernameFieldSchema,
  display_name: z.string().min(1, "This field is required"),
  bio: z.string().optional(),
  avatarPath: z.string().optional(),
});
