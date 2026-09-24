"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import Spinner from "@/components/Spinner";
import { getWorkouts } from "@/lib/api";

const SORT_KEYS = {
  Duration: "duration",
  Calories: "caloriesBurned",
  Rating: "rating",
};

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const key = SORT_KEYS[sortBy];
    return [...workouts].sort((a, b) => b[key] - a[key]);
  }, [workouts, sortBy]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-paper">
              The Library
            </h2>
            <p className="mt-1 font-body text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          {status === "ready" && (
            <SortDropdown value={sortBy} onChange={setSortBy} />
          )}
        </div>

        {status === "loading" && <Spinner label="Loading workouts…" />}

        {status === "error" && (
          <p className="rounded-xl2 border border-danger/40 bg-danger/10 px-4 py-6 text-center font-body text-sm text-danger">
            Couldn&rsquo;t load the workout library. Please refresh the page.
          </p>
        )}

        {status === "ready" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
