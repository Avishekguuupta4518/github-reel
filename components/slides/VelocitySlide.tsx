"use client";

import React from "react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { ResponsiveContainer, AreaChart, Area, YAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export const VelocitySlide: React.FC<{ data: GithubReelData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SlideLayout
      gradientStart={isDark ? "#111827" : "#E0E7FF"}
      gradientEnd={isDark ? "#000000" : "#FFFFFF"}
    >
      <div className="flex-1 flex flex-col justify-between h-full px-4 md:px-0">
        {/* TOP TEXT */}
        <div className="mt-6 md:mt-0">
          <TextReveal
            text="Your Coding rhythm."
            className={`text-3xl md:text-5xl font-serif italic mb-2 leading-tight ${
              isDark ? "text-white" : "text-black"
            }`}
          />

          <TextReveal
            text={`You pushed code on ${data.velocityData.filter((d) => d.commits > 0).length} days.`}
            className={`text-sm md:text-xl font-sans leading-relaxed ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
            delay={0.5}
            highlight={`${data.velocityData.filter((d) => d.commits > 0).length}`}
          />
        </div>

        {/* CHART */}
        <motion.div
          className={`relative w-full rounded-3xl border overflow-hidden backdrop-blur-2xl h-52 md:h-72 ${
            isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
          }`}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10" />

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.velocityData}>
              <defs>
                <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>

              <YAxis hide />

              <Tooltip
                contentStyle={{
                  background: isDark
                    ? "rgba(0,0,0,0.9)"
                    : "rgba(255,255,255,0.95)",
                  border: "none",
                  borderRadius: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="commits"
                stroke="#8B5CF6"
                fill="url(#commitGradient)"
                strokeWidth={3}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* BOTTOM TEXT */}
        <div className="pb-12 md:pb-0 mt-3 md:mt-10">
          <TextReveal
            text="Your longest streak?"
            className={`text-xs md:text-lg font-mono mb-1 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
            delay={2.0}
          />

          <TextReveal
            text={`${data.longestStreak} days. Unstoppable.`}
            className={`text-2xl md:text-4xl font-serif leading-tight ${
              isDark ? "text-white" : "text-black"
            }`}
            highlight="Unstoppable."
            delay={2.5}
          />
        </div>
      </div>
    </SlideLayout>
  );
};
