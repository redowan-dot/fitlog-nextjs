import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="grain-fade relative overflow-hidden border-b border-line bg-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-5">
          <span className="rounded-full border border-line px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-volt">
            Workout Library
          </span>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-paper sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="max-w-md font-body text-base leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&rsquo;s plan, and watch the week&rsquo;s work add up.
          </p>
          <a
            href="#library"
            className="mt-2 flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink shadow-volt transition-transform hover:scale-105"
          >
            Browse Workouts
            <ArrowDown size={16} strokeWidth={2.5} />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-none">
          <div className="absolute inset-0 rounded-full bg-volt/10 blur-3xl" />
          <div className="relative flex h-full items-center justify-center rounded-xl2 border border-line bg-surface p-6">
            <Image
              src="/banner.png"
              alt="Anatomical illustration of a lifter on a gym machine"
              width={420}
              height={420}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
