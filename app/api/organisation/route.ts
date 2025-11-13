import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = claims.claims.sub;

  const form = await request.formData();
  const name = String(form.get("name") || "");
  const logo = String(form.get("logo") || "");

  if (!name || !logo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Create organisation and add the creator as admin
  const { data: org, error: orgError } = await supabase
    .from("organisations")
    .insert({ name, logo })
    .select("id")
    .limit(1)
    .maybeSingle();

  if (orgError || !org) {
    return NextResponse.json({ error: orgError?.message || "Failed to create org" }, { status: 500 });
  }

  const { error: memberError } = await supabase.from("organisation_members").insert({
    organisation_id: org.id,
    user_id: userId,
    role: "admin",
  });

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
