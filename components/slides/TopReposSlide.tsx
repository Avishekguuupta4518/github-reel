"use client";

import React from "react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { motion } from "framer-motion";
import { Star, Trophy, Medal, Award } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const langColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  "C#": "#178600",
  Vue: "#41b883",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  "Jupyter Notebook": "#DA5B0B",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dart: "#00B4AB",
};

export const TopReposSlide: React.FC<{ data: GithubReelData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { topRepos } = data;

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy size={18} className="text-yellow-400" />;
      case 1:
        return <Medal size={18} className="text-gray-300" />;
      case 2:
        return <Award size={18} className="text-amber-600" />;
      default:
        return (
          <span
            className={`font-mono text-xs w-5 text-center ${isDark ? "text-neutral-500" : "text-neutral-600"}`}
          >
            #{index + 1}
          </span>
        );
    }
  };

  const maxStars = Math.max(...topRepos.map((r) => r.stars || 0));

  return (
    <SlideLayout gradientStart="#7c3aed" gradientEnd="#1e1b4b">
      <div className="flex-1 flex flex-col justify-center">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <TextReveal
            text="Your standout builds"
            className={`text-3xl font-serif italic mb-2 ${isDark ? "text-white" : "text-black"}`}
          />
          <TextReveal
            text={`${topRepos.length} projects that shaped your year`}
            className={`text-sm font-sans ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            delay={0.3}
          />
        </div>

        {/* REPOS LIST */}
        <div className="space-y-3 max-w-md mx-auto w-full px-4">
          {topRepos.slice(0, 5).map((repo, index) => {
            const barWidth = maxStars ? (repo.stars / maxStars) * 100 : 0;

            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.4 + index * 0.15,
                  type: "spring",
                  damping: 20,
                }}
                className={`relative overflow-hidden flex items-center gap-3 p-3 rounded-xl border
                  ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30"
                      : isDark
                        ? "bg-neutral-900/60 border-neutral-800"
                        : "bg-neutral-100/60 border-neutral-200"
                  }
                `}
              >
                {/* progress bar background */}
                <div
                  className="absolute left-0 top-0 h-full bg-white/5"
                  style={{ width: `${barWidth}%` }}
                />

                <div className="relative z-10 flex items-center gap-3 w-full">
                  {/* rank */}
                  <div className="flex-shrink-0 w-6 flex justify-center">
                    {getRankIcon(index)}
                  </div>

                  {/* repo info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-bold truncate ${isDark ? "text-white" : "text-black"}`}
                      >
                        {repo.name}
                      </h3>

                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            langColors[repo.language] || "#A3A3A3",
                        }}
                      />
                    </div>

                    <p
                      className={`text-xs truncate ${isDark ? "text-neutral-500" : "text-neutral-600"}`}
                    >
                      {repo.language} • {repo.description}
                    </p>
                  </div>

                  {/* stars */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star
                      size={14}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                    <span
                      className={`font-mono text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      {repo.stars >= 1000
                        ? `${(repo.stars / 1000).toFixed(1)}k`
                        : repo.stars}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER PHRASE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={`mt-8 text-center text-sm font-sans italic ${isDark ? "text-neutral-500" : "text-neutral-600"}`}
        >
          “Code becomes legacy when it ships.”
        </motion.p>
      </div>
    </SlideLayout>
  );
};
