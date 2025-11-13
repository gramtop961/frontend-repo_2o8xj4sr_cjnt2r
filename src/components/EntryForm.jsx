import { useState } from "react";

export default function EntryForm({ onCreated, type }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const fieldsByType = {
    workout: [
      { name: "date", type: "date", label: "Date" },
      { name: "workout_type", type: "text", label: "Type" },
      { name: "duration_minutes", type: "number", label: "Duration (min)" },
      { name: "calories_burned", type: "number", label: "Calories" },
      { name: "notes", type: "text", label: "Notes" },
    ],
    meal: [
      { name: "date", type: "date", label: "Date" },
      { name: "meal_type", type: "text", label: "Meal Type" },
      { name: "calories", type: "number", label: "Calories" },
      { name: "protein_g", type: "number", label: "Protein (g)" },
      { name: "carbs_g", type: "number", label: "Carbs (g)" },
      { name: "fat_g", type: "number", label: "Fat (g)" },
      { name: "notes", type: "text", label: "Notes" },
    ],
    weight: [
      { name: "date", type: "date", label: "Date" },
      { name: "weight_kg", type: "number", label: "Weight (kg)" },
      { name: "notes", type: "text", label: "Notes" },
    ],
  };

  const endpoint = {
    workout: "/api/workouts",
    meal: "/api/meals",
    weight: "/api/weights",
  }[type];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backend}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create");
      const data = await res.json();
      onCreated?.(data);
      setForm({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {fieldsByType[type].map((f) => (
          <div key={f.name} className="col-span-2 sm:col-span-1">
            <label className="block text-xs text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
            <input
              type={f.type}
              value={form[f.name] ?? ""}
              onChange={(e) =>
                setForm((s) => ({ ...s, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
