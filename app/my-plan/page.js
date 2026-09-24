"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  Dumbbell,
  ListChecks,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";

export default function MyPlanPage() {
  const { today, saved, removeToday, removeSaved, markDone } = usePlan();
  const [tab, setTab] = useState("today");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const t = window.setTimeout(() => setStatus("ready"), 350);
    return () => window.clearTimeout(t);
  }, []);

  const list = tab === "today" ? today : saved;
  const minutes = today.reduce((sum, w) => sum + (w.duration || 0), 0);
  const calories = today.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-paper sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 font-body text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Exercises" value={today.length} icon={Dumbbell} />
        <MetricCard label="Minutes" value={minutes} icon={Clock} />
        <MetricCard label="Calories" value={calories} icon={Flame} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        <TabButton active={tab === "today"} onClick={() => setTab("today")}>
          Today&rsquo;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      <div className="mt-6">
        {status === "loading" && <Spinner label="Loading workouts…" />}

        {status === "ready" && list.length === 0 && (
          <EmptyState />
        )}

        {status === "ready" && list.length > 0 && (
          <ul className="flex flex-col gap-3">
            {list.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                showDone={tab === "today"}
                onRemove={() =>
                  tab === "today"
                    ? removeToday(workout.id)
                    : removeSaved(workout.id)
                }
                onMarkDone={() => markDone(workout.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl2 border border-line bg-surface px-3 py-5 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-3">
      <Icon size={18} className="text-volt" />
      <div className="flex flex-col sm:items-start">
        <span className="font-display text-2xl font-bold text-paper">
          {value}
        </span>
        <span className="font-display text-[11px] uppercase tracking-wide text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-3 font-display text-sm uppercase tracking-wide transition-colors ${
        active ? "text-volt" : "text-muted hover:text-paper"
      }`}
    >
      {children}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-volt" />
      )}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-line px-6 py-16 text-center">
      <ListChecks size={28} className="text-muted" />
      <h3 className="font-display text-lg uppercase tracking-wide text-paper">
        Nothing here yet
      </h3>
      <p className="max-w-xs font-body text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-volt px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({ workout, showDone, onRemove, onMarkDone }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-xl2 border border-line bg-surface p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-20 flex-none overflow-hidden rounded-lg bg-surface2 sm:h-16 sm:w-16">
        <Image src={workout.image} alt={workout.name} fill sizes="80px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base font-semibold uppercase tracking-wide text-paper ${
            workout.done ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="font-body text-sm text-muted">{workout.equipment}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3 font-body text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-volt" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-volt" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-volt" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-2 self-stretch sm:self-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 rounded-full border border-line px-3 py-2 text-center font-display text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:border-volt hover:text-volt sm:flex-none"
        >
          View Details
        </Link>
        {showDone && (
          <button
            type="button"
            onClick={onMarkDone}
            aria-label="Mark as done"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-volt hover:text-volt"
          >
            <Check size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-danger hover:text-danger"
        >
          <X size={16} />
        </button>
      </div>
    </li>
  );
}
