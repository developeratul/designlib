// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET: z.string(),
    SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID: z.string(),
    NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID:
      process.env.NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET: process.env.SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET,
    NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID:
      process.env.NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID,
    SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET: process.env.SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET,
  },
});
