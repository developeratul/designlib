import { ReactNode } from "react";
import { Database } from "./supabase";

export interface AppProps {
  children: ReactNode;
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Relations<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Relationships"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type User = Tables<"users">;
export type Category = Tables<"categories">;
export type Resource = Tables<"resources">;
export type Bookmark = Tables<"bookmarks">;

export type ResourceWithMeta = Resource & {
  user?: User | null;
};
