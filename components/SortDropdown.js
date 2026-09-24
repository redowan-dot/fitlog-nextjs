"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const OPTIONS = ["Duration", "Calories", "Rating"];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-display text-sm uppercase tracking-wide text-paper transition-colors hover:border-volt/60"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-muted">Sort By</span>
        {value}
        <ChevronDown
          size={16}
          className={`text-volt transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl2 border border-line bg-surface shadow-lg"
        >
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left font-body text-sm transition-colors hover:bg-surface2 ${
                  value === opt ? "text-volt" : "text-paper"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
