import Image from "next/image";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <img width="100%" height="auto" src="/time-hero.gif"/>
      </div>
    </div>
  );
}
