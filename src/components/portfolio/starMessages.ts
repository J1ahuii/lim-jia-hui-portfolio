import { supabase } from "@/integrations/supabase/client";

export type StarMessage = {
  id: string;
  body: string;
  created_at: string;
};

export async function fetchLatestStarMessages(limit = 12): Promise<StarMessage[]> {
  const { data, error } = await supabase
    .from("star_messages")
    .select("id, body, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as StarMessage[];
}

export async function postStarMessage(body: string): Promise<StarMessage> {
  const trimmed = body.trim().slice(0, 80);
  const { data, error } = await supabase
    .from("star_messages")
    .insert({ body: trimmed })
    .select("id, body, created_at")
    .single();
  if (error) throw error;
  return data as StarMessage;
}
