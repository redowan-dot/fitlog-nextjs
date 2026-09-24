"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlanContext = createContext(null);

const STORAGE_KEY = "fitlog:v1";
const PLAN_CAP = 5;

function loadInitial() {
  if (typeof window === "undefined") {
    return { today: [], saved: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { today: [], saved: [] };
    const parsed = JSON.parse(raw);
    return {
      today: Array.isArray(parsed.today) ? parsed.today : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { today: [], saved: [] };
  }
}

function toEntry(workout) {
  return {
    id: workout.id,
    name: workout.name,
    image: workout.image,
    equipment: workout.equipment,
    duration: workout.duration,
    caloriesBurned: workout.caloriesBurned,
    rating: workout.rating,
    done: false,
  };
}

export function PlanProvider({ children }) {
  const [today, setToday] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const hydrated = useRef(false);

  useEffect(() => {
    const initial = loadInitial();
    setToday(initial.today);
    setSaved(initial.saved);
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ today, saved }));
  }, [today, saved]);

  function pushToast(message, tone = "default") {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }

  function addToday(workout) {
    let outcome = "added";
    setToday((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        outcome = "duplicate";
        return prev;
      }
      if (prev.length >= PLAN_CAP) {
        outcome = "full";
        return prev;
      }
      return [...prev, toEntry(workout)];
    });
    if (outcome === "added") pushToast("Added to today's plan", "success");
    else if (outcome === "duplicate") pushToast("Already in today's plan", "default");
    else pushToast("Today's plan is full — finish a lift first", "danger");
    return outcome;
  }

  function addSaved(workout) {
    let outcome = "added";
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        outcome = "duplicate";
        return prev;
      }
      return [...prev, toEntry(workout)];
    });
    if (outcome === "added") pushToast("Saved for later", "success");
    else pushToast("Already in your saved list", "default");
    return outcome;
  }

  function removeToday(id) {
    setToday((prev) => prev.filter((w) => w.id !== id));
    pushToast("Removed from today's plan", "default");
  }

  function removeSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    pushToast("Removed from saved", "default");
  }

  function markDone(id) {
    setToday((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    const target = today.find((w) => w.id === id);
    pushToast(target && !target.done ? "Marked as done" : "Marked as not done", "success");
  }

  const value = {
    today,
    saved,
    addToday,
    addSaved,
    removeToday,
    removeSaved,
    markDone,
    toasts,
    planCap: PLAN_CAP,
    isInToday: (id) => today.some((w) => w.id === id),
    isInSaved: (id) => saved.some((w) => w.id === id),
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
