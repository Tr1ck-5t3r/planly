import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = claims.claims.sub;

  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id, role")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (!membership || membership.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await request.formData();
  const id = String(form.get("id") || "");
  const name = String(form.get("name") || "");
  const logo = String(form.get("logo") || "");

  if (!id || !name || !logo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("organisations").update({ name, logo }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
