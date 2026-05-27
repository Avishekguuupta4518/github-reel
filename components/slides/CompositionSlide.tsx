"use client";

import React from "react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { motion } from "framer-motion";
import {
  GitCommitHorizontal,
  GitPullRequest,
  CircleDot,
  Eye,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "@/context/ThemeContext";

export const CompositionSlide: React.FC<{ data: GithubReelData }> = ({
  data,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { contributionBreakdown } = data;

  const chartData = [
    {
      name: "Commits",
      value: contributionBreakdown.commits,
      color: "#3B82F6",
      icon: GitCommitHorizontal,
    },
    {
      name: "PRs",
      value: contributionBreakdown.prs,
      color: "#8B5CF6",
      icon: GitPullRequest,
    },
    {
      name: "Issues",
      value: contributionBreakdown.issues,
      color: "#EAB308",
      icon: CircleDot,
    },
    {
      name: "Reviews",
      value: contributionBreakdown.reviews,
      color: "#EC4899",
      icon: Eye,
    },
  ].filter((d) => d.value > 0);

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <SlideLayout
      gradientStart={isDark ? "#0f172a" : "#eef2ff"}
      gradientEnd={isDark ? "#000000" : "#ffffff"}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <TextReveal
            text="Your coding DNA."
            className={`text-xl font-mono mb-2 uppercase tracking-widest justify-center ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
          />
          <TextReveal
            text="Every contribution tells a different story."
            className={`text-4xl font-serif justify-center ${isDark ? "text-white" : "text-black"}`}
          />
        </div>

        <div className="w-full max-w-sm h-64 relative mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className={`text-2xl font-bold font-mono ${isDark ? "text-white" : "text-black"}`}
            >
              100%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-lg relative z-10">
          {chartData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.2 + index * 0.15,
                  duration: 0.6,
                }}
                className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-2xl ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                }`}
              >
                {/* BACKGROUND ACCENT */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: item.color,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: item.color,
                        }}
                      />
                    </div>

                    <span
                      className={`text-xs uppercase tracking-widest ${
                        isDark ? "text-white/40" : "text-black/40"
                      }`}
                    >
                      {Math.round((item.value / total) * 100)}%
                    </span>
                  </div>

                  <h3
                    className={`text-3xl font-black tracking-tight ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {item.value.toLocaleString()}
                  </h3>

                  <p
                    className={`mt-1 text-sm ${
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
};
