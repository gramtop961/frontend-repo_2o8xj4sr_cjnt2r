import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full py-6 bg-white/50 dark:bg-gray-900/40 backdrop-blur border-b border-gray-200 dark:border-gray-800 relative overflow-hidden">
      {/* Decorative AR-like colorful shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-sky-400" />
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-500" />
      </div>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-indigo-500/30 ring-1 ring-white/40" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Health & Fitness Tracker</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Track workouts, meals, and weight</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
