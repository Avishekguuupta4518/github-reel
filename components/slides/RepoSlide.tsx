"use client";

import React from "react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { motion } from "framer-motion";
import { Star, GitCommit } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const RepoSlide: React.FC<{ data: GithubReelData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SlideLayout gradientStart="#1e293b" gradientEnd="#0f172a">
      <div className="flex-1 flex flex-col items-center justify-center perspective-1000">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <TextReveal
            text="Every journey has a signature project."
            className={`text-3xl font-serif ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
          />
        </div>

        {/* CARD */}
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 10, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            delay: 0.5,
          }}
          className={`w-72 aspect-[3/4] border rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group backdrop-blur-xl
            ${isDark ? "bg-neutral-900/70 border-neutral-800" : "bg-white/70 border-neutral-200"}
          `}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* glow overlay */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            ${isDark ? "bg-gradient-to-tr from-white/10 to-transparent" : "bg-gradient-to-tr from-black/5 to-transparent"}
          `}
          />

          {/* TOP */}
          <div>
            <div className="text-xs font-mono tracking-widest text-hero-blue mb-2">
              YOUR SIGNATURE REPO
            </div>

            <h2
              className={`text-3xl font-bold leading-tight break-words mb-4 ${isDark ? "text-white" : "text-black"}`}
            >
              {data.topRepo.name}
            </h2>

            <p
              className={`text-sm leading-relaxed font-sans line-clamp-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              {data.topRepo.description ||
                "No description provided — but it made an impact."}
            </p>
          </div>

          {/* BOTTOM STATS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-yellow-400 drop-shadow-sm">
              <Star size={18} fill="currentColor" className="animate-pulse" />
              <span className="font-mono text-lg">
                {data.topRepo.stars.toLocaleString()} stars
              </span>
            </div>

            <div className={`flex items-center justify-between`}>
              <div
                className={`flex items-center gap-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
              >
                <GitCommit size={18} />
                <span className="font-mono text-sm">
                  {data.topRepo.language}
                </span>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-mono
                ${isDark ? "bg-white/10 text-neutral-300" : "bg-black/5 text-neutral-700"}
              `}
              >
                main project
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
