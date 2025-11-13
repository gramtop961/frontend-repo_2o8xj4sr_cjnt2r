import { lazy, Suspense, useMemo } from "react";

const Spline = lazy(() => import("@splinetool/react-spline").then(m => ({ default: m.Spline })));

export default function SplineCard() {
  const scene = import.meta.env.VITE_SPLINE_SCENE;
  const hasScene = typeof scene === "string" && scene.length > 0;
  const hint = useMemo(() => {
    return hasScene ? null : "Set VITE_SPLINE_SCENE to a Spline scene URL to enable the 3D illustration.";
  }, [hasScene]);

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/70 dark:to-gray-900/30 backdrop-blur-xl">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">3D Illustration</h3>
      <div className="aspect-[16/10] rounded-xl overflow-hidden border border-white/30 dark:border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20">
        {hasScene ? (
          <Suspense fallback={<div className="w-full h-full grid place-items-center text-xs text-gray-600 dark:text-gray-300">Loading 3D…</div>}>
            <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
          </Suspense>
        ) : (
          <div className="w-full h-full grid place-items-center p-4">
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
