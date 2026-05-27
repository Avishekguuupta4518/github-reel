"use client";

import React from "react";
import { SlideLayout } from "../SlideLayout";
import { GithubReelData } from "../../types";
import { TextReveal } from "../TextReveal";
import { motion } from "framer-motion";
import { Code2, Hash } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const LanguagesSlide: React.FC<{ data: GithubReelData }> = ({
  data,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const topLang = data.topLanguages[0];

  const getLanguageIcon = (lang: string) => {
    const icons: Record<string, string> = {
      TypeScript: "TS",
      JavaScript: "JS",
      Python: "PY",
      Java: "JV",
      C: "C",
      "C++": "C++",
      Go: "GO",
      Rust: "RS",
      PHP: "PHP",
      Kotlin: "KT",
      Swift: "SW",
      Dart: "DT",
      HTML: "</>",
      CSS: "{}",
    };

    return icons[lang] || "< />";
  };

  return (
    <SlideLayout
      gradientStart={topLang.color}
      gradientEnd={isDark ? "#000000" : "#f8fafc"}
    >
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden px-4">
        {/* Cleaner Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {data.topLanguages.slice(0, 3).map((lang, i) => (
            <motion.div
              key={lang.name}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.12, 0.18, 0.12],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
              }}
              className="absolute rounded-full blur-[120px]"
              style={{
                backgroundColor: lang.color,
                width: `${220 + i * 60}px`,
                height: `${220 + i * 60}px`,
                top: `${10 + i * 25}%`,
                left: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Heading */}
          <TextReveal
            text="Your Stack"
            className={`text-lg md:text-xl font-mono mb-5 uppercase tracking-[0.35em] ${
              isDark ? "text-neutral-300" : "text-neutral-700"
            }`}
          />

          {/* Main Text */}
          <TextReveal
            text={`${topLang.name} dominated your workflow.`}
            className={`text-4xl md:text-6xl font-serif leading-tight mb-5 ${
              isDark ? "text-white" : "text-black"
            }`}
            highlight={topLang.name}
            delay={0.4}
          />

          {/* Total Languages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border ${
              isDark
                ? "bg-white/5 border-white/10 text-neutral-300"
                : "bg-black/5 border-black/10 text-neutral-700"
            }`}
          >
            <Code2 size={16} />
            <span className="text-sm md:text-base font-mono">
              {data.topLanguages.length}+ Languages Used
            </span>
          </motion.div>

          {/* Bars */}
          <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            {data.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.2 }}
                className={`rounded-2xl p-4 border backdrop-blur-md ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isDark ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      #{i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: `${lang.color}25`,
                        color: lang.color,
                        border: `1px solid ${lang.color}40`,
                      }}
                    >
                      {getLanguageIcon(lang.name)}
                    </div>

                    {/* Name */}
                    <div className="text-left">
                      <p
                        className={`text-lg font-semibold ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      >
                        {lang.name}
                      </p>

                      <p
                        className={`text-xs uppercase tracking-widest ${
                          isDark ? "text-neutral-500" : "text-neutral-500"
                        }`}
                      >
                        Most Used
                      </p>
                    </div>
                  </div>

                  {/* Percentage */}
                  <div
                    className={`text-lg font-mono ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {lang.percentage}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className={`w-full h-3 rounded-full overflow-hidden ${
                    isDark ? "bg-white/10" : "bg-black/10"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{
                      duration: 1,
                      delay: 1.5 + i * 0.2,
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: lang.color,
                      boxShadow: `0 0 20px ${lang.color}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
