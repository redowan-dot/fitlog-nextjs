import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-28 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface2 text-volt">
        <Dumbbell size={26} />
      </span>
      <h1 className="font-display text-6xl font-bold text-paper">404</h1>
      <h2 className="font-display text-lg uppercase tracking-wide text-paper">
        This lift doesn&rsquo;t exist
      </h2>
      <p className="font-body text-sm text-muted">
        The page you&rsquo;re looking for was moved, renamed, or never
        racked in the first place.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-105"
      >
        Back to workouts
      </Link>
    </div>
  );
}
