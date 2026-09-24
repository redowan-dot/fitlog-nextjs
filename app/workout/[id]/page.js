"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarPlus,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { getWorkout, getWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import Spinner from "@/components/Spinner";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { addToday, addSaved, isInToday, isInSaved, today, planCap } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    getWorkout(id)
      .then((data) => {
        if (!cancelled) {
          setWorkout(Array.isArray(data) ? data[0] : data);
          setStatus("ready");
        }
      })
      .catch(() => {
        getWorkouts()
          .then((list) => {
            const found = list.find((w) => w.id === id);
            if (!cancelled) {
              if (found) {
                setWorkout(found);
                setStatus("ready");
              } else {
                setStatus("notfound");
              }
            }
          })
          .catch(() => {
            if (!cancelled) setStatus("error");
          });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return <Spinner label="Loading workout…" />;
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl uppercase text-paper">
          Workout not found
        </h1>
        <p className="mt-2 font-body text-muted">
          That lift isn&rsquo;t in the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 font-display text-sm font-semibold uppercase text-ink"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  if (status === "error" || !workout) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="font-body text-danger">
          Couldn&rsquo;t load this workout. Please try again.
        </p>
      </div>
    );
  }

  const alreadyPlanned = isInToday(workout.id);
  const alreadySaved = isInSaved(workout.id);
  const planFull = today.length >= planCap && !alreadyPlanned;

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 font-display text-sm uppercase tracking-wide text-muted transition-colors hover:text-volt"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl2 border border-line bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-paper sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 font-body text-base leading-relaxed text-muted">
              {workout.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-display text-xs uppercase tracking-wide text-volt"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl2 border border-line bg-surface p-5 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-0.5">
                <span className="font-display text-[11px] uppercase tracking-wide text-muted">
                  {spec.label}
                </span>
                <span className="font-body text-sm font-medium text-paper">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg uppercase tracking-wide text-paper">
              Instructions
            </h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 font-body text-sm text-muted">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-surface2 font-display text-xs text-volt">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={alreadyPlanned || planFull}
              onClick={() => addToday(workout)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-volt px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <CalendarPlus size={17} strokeWidth={2.5} />
              {alreadyPlanned ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              type="button"
              disabled={alreadySaved}
              onClick={() => addSaved(workout)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-5 py-3 font-display text-sm font-semibold uppercase tracking-wide text-paper transition-colors hover:border-volt hover:text-volt disabled:cursor-not-allowed disabled:opacity-40"
            >
              {alreadySaved ? (
                <BookmarkCheck size={17} strokeWidth={2.5} />
              ) : (
                <Bookmark size={17} strokeWidth={2.5} />
              )}
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
