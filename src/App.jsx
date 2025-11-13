import { useState } from "react";
import Header from "./components/Header";
import EntryForm from "./components/EntryForm";
import List from "./components/List";

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

function BackgroundAR() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layered HD colorful gradients and glassy blobs */}
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-rose-400 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-10 right-[-10%] h-[28rem] w-[28rem] bg-gradient-to-br from-sky-400 via-cyan-400 to-indigo-500 rounded-full blur-3xl opacity-25" />
      <div className="absolute bottom-[-20%] left-[10%] h-[26rem] w-[26rem] bg-gradient-to-br from-emerald-400 via-lime-400 to-yellow-400 rounded-full blur-3xl opacity-20" />
      {/* AR-ish grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.25),transparent_60%)]" />
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("workout");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-black relative">
      <BackgroundAR />
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

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl shadow-sky-500/5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add {tab}</h2>
            <EntryForm type={tab} onCreated={() => {}} />
          </div>

          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-white/10 shadow-xl shadow-indigo-500/5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent</h2>
            <List key={tab} type={tab} />
          </div>
        </div>

        {/* Decorative fitness cards */}
        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Goals", "Streak", "Calories"].map((label, i) => (
            <div key={label} className="relative overflow-hidden rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/70 dark:to-gray-900/30 backdrop-blur-xl">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 blur-2xl opacity-30" />
              <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 blur-2xl opacity-20" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">High-level overview coming soon</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
