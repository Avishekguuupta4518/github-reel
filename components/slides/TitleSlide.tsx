"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { useTheme } from "@/context/ThemeContext";

export const TitleSlide: React.FC<{ data: GithubReelData }> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SlideLayout
      gradientStart={isDark ? "#0F172A" : "#DBEAFE"}
      gradientEnd={isDark ? "#000000" : "#FFFFFF"}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="mb-12 relative"
        >
          <div className="absolute inset-0 bg-hero-blue blur-3xl opacity-40 animate-pulse-slow"></div>
          <Github
            size={120}
            className={`relative z-10 ${isDark ? "text-white" : "text-black"}`}
          />
        </motion.div>

        <TextReveal
          text={`${data.year}.`}
          className={`text-8xl font-serif mb-4 tracking-tighter ${isDark ? "text-white" : "text-black"}`}
          delay={0.5}
        />

        <TextReveal
          text="Every commit tells a story."
          className={`text-2xl font-sans max-w-xs mx-auto ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
          delay={1.5}
        />
      </div>
    </SlideLayout>
  );
};
