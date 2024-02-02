import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function getFileUrl(bucket: string, path: string) {
  const supabase = createClientComponentClient<Database>();
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
