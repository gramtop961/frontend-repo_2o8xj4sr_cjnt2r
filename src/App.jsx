import { useMemo, useState } from "react";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import List from "./components/List";
import BackgroundFX from "./components/BackgroundFX";
import { Ring, Sparkline } from "./components/ProgressRings";
import SplineCard from "./components/SplineCard";

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-xl border transition shadow-sm ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-blue-600/30"
          : "bg-white/70 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [tab, setTab] = useState("workout");

  // Demo trend data (can be sourced from backend later)
  const charts = useMemo(() => {
    return {
      goals: 68,
      streak: 42,
      calories: [320, 540, 480, 600, 520, 680, 740, 690, 720, 810, 760, 840],
      weight: [82.2, 82.0, 81.8, 81.6, 81.5, 81.2, 81.0, 80.8, 80.6, 80.4, 80.3, 80.1],
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-black relative">
      <BackgroundFX activeTab={tab} />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-3 mb-8">
          <TabButton active={tab === "workout"} onClick={() => setTab("workout")}>
            Workouts
          </TabButton>
          <TabButton active={tab === "meal"} onClick={() => setTab("meal")}>
            Meals
          </TabButton>
          <TabButton active={tab === "weight"} onClick={() => setTab("weight")}>
            Weight
          </TabButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl shadow-sky-500/5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add {tab}</h2>
              <EntryForm type={tab} onCreated={() => {}} />
            </div>

            <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl shadow-indigo-500/5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent</h2>
              <List key={tab} type={tab} />
            </div>
          </div>

          {/* Sidebar: Fitness visuals and charts */}
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/70 dark:to-gray-900/30 backdrop-blur-xl">
              <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 blur-2xl opacity-30" />
              <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 blur-2xl opacity-20" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Progress</h3>
              <div className="flex items-center justify-between gap-4">
                <Ring value={charts.goals} label={`${charts.goals}%`} color="#22d3ee" />
                <Ring value={Math.min(100, (charts.streak / 60) * 100)} label={`${charts.streak}d`} color="#a78bfa" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/70 dark:to-gray-900/30 backdrop-blur-xl">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Trends</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Calories (last 12 sessions)</p>
                  <Sparkline data={charts.calories} color="#f59e0b" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight (kg)</p>
                  <Sparkline data={charts.weight} color="#22c55e" />
                </div>
              </div>
            </div>

            <SplineCard />
          </aside>
        </div>
      </main>
    </div>
  );
}
