import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function OrganisationSetupPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userId = data.claims.sub;
  const { data: membership } = await supabase
    .from("organisation_members")
    .select("organisation_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (membership) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/10 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Set up your organisation</CardTitle>
          <CardDescription>
            Create an organisation to get started. You will be the admin.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action="/api/organisation"
            method="post"
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organisation Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Acme Corporation"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                placeholder="https://example.com/logo.png"
                required
              />
            </div>

            <CardFooter className="px-0">
              <Button type="submit" className="w-full">
                Create Organisation
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
