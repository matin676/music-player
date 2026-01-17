import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-neutral-900 via-neutral-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
