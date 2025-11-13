import { useEffect, useState } from "react";

export default function List({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const backend = import.meta.env.VITE_BACKEND_URL;

  const endpoint = {
    workout: "/api/workouts",
    meal: "/api/meals",
    weight: "/api/weights",
  }[type];

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${backend}${endpoint}`);
        const data = await res.json();
        if (active) setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [backend, endpoint]);

  if (loading) return <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>;
  if (!items.length) return <p className="text-sm text-gray-600 dark:text-gray-300">No entries yet</p>;

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white/60 dark:bg-gray-900/50 backdrop-blur">
      {items.map((it) => (
        <li key={it.id} className="p-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {type === "workout" && (
                <span>{it.date} • {it.workout_type} • {it.duration_minutes} min</span>
              )}
              {type === "meal" && (
                <span>{it.date} • {it.meal_type} • {it.calories} kcal</span>
              )}
              {type === "weight" && (
                <span>{it.date} • {it.weight_kg} kg</span>
              )}
            </div>
            {it.notes && <span className="text-xs text-gray-500 dark:text-gray-400">{it.notes}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
