import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface transition-colors hover:border-volt/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-display text-[11px] uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-paper">
          {workout.name}
        </h3>

        <p className="font-body text-sm text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3 font-body text-sm text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-volt" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-volt" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-volt" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
