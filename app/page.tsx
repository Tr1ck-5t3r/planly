import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href="/" className="text-lg">
                Planly
              </Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>

        <div className="flex-1 flex flex-col gap-12 max-w-5xl p-5">
          <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">Planly — assign tasks and send reminders</h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Planly helps teams assign tasks, track progress, and send reminders to users so nothing slips through the cracks.
                Built with Next.js and Supabase for auth and realtime data.
              </p>

              <div className="mt-6 flex gap-3">
                <Link href="/protected" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-95">
                  Open dashboard
                </Link>
                <Link href="/auth/sign-up" className="inline-flex items-center rounded-md border px-4 py-2 text-sm">
                  Sign up
                </Link>
              </div>
            </div>

            <div className="hidden md:block md:w-1/3">
              <Hero />
            </div>
          </section>

          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{' '}
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
