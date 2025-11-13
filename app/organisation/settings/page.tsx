// app/organisation/settings/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function OrganisationSettingsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userId = data.claims.sub;

  // Check organisation membership
  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id, role")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/organisation");
  }

  if (membership.role !== "admin") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access denied</CardTitle>
            <CardDescription>
              Only organisation admins can edit organisation settings.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const { data: org } = await supabase
    .from("organisations")
    .select("id, name, logo")
    .eq("id", membership.organisation_id)
    .limit(1)
    .maybeSingle();

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/10 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Organisation Settings</CardTitle>
          <CardDescription>Update your organisation details.</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action="/api/organisation/settings"
            method="post"
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="id" value={org?.id} />

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organisation Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={org?.name ?? ""}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                defaultValue={org?.logo ?? ""}
                placeholder="https://example.com/logo.png"
                required
              />
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
