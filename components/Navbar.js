"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { today, saved } = usePlan();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-volt text-ink">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-surface2 text-volt"
                    : "text-muted hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-volt px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-105"
            aria-label={`Plan: ${today.length} workouts`}
          >
            Plan
            <span className="rounded-full bg-ink/15 px-1.5 py-0.5 text-[11px] leading-none">
              {today.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:border-volt hover:text-volt"
            aria-label={`Saved: ${saved.length} workouts`}
          >
            Saved
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] leading-none">
              {saved.length}
            </span>
          </Link>
          <button
            type="button"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-paper md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 font-display text-sm uppercase tracking-wide ${
                  active ? "bg-surface2 text-volt" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
