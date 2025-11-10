
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />

        <div className="flex-1 flex flex-col gap-12 max-w-5xl p-5">
          <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">
                Planly — assign tasks and send reminders
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Planly helps teams assign tasks, track progress, and send
                reminders to users so nothing slips through the cracks. Built
                with Next.js and Supabase for auth and realtime data.
              </p>

              <div className="mt-6 flex gap-3">
                <Button>
                  {" "}
                  <Link href="/dashboard">Open dashboard</Link>
                </Button>
                <Button>
                  {" "}
                  <Link href="/auth/sign-up">Sign up</Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:block md:w-1/3">
              <Hero />
            </div>
          </section>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
