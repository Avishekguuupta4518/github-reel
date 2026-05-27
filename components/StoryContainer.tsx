"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GithubReelData, SlideType } from "../types";
import { SLIDE_DURATION_MS } from "../constants";

import { TitleSlide } from "./slides/TitleSlide";
import { VelocitySlide } from "./slides/VelocitySlide";
import { GridSlide } from "./slides/GridSlide";
import { CompositionSlide } from "./slides/CompositionSlide";
import { RoutineSlide } from "./slides/RoutineSlide";
import { ProductivitySlide } from "./slides/ProductivitySlide";
import { CommunitySlide } from "./slides/CommunitySlide";
import { LanguagesSlide } from "./slides/LanguagesSlide";
import { TopReposSlide } from "./slides/TopReposSlide";
import { RepoSlide } from "./slides/RepoSlide";
import { PosterSlide } from "./slides/PosterSlide";

import {
  X,
  Sun,
  Moon,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

interface StoryContainerProps {
  data: GithubReelData;
  onComplete: () => void;
}

export const StoryContainer: React.FC<StoryContainerProps> = ({
  data,
  onComplete,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalSlides = 11;
  const isLastSlide = currentSlide === SlideType.POSTER;

  const progressRef = useRef<number | null>(null);
  const touchStartX = useRef(0);

  // ✅ FIX: stable session reference (prevents restart on theme toggle)
  const sessionRef = useRef({
    slide: 0,
    startTime: Date.now(),
  });

  /* ---------------- NEXT ---------------- */
  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((p) => {
        const next = p + 1;
        sessionRef.current.slide = next; // keep session synced
        sessionRef.current.startTime = Date.now();
        return next;
      });
      setProgress(0);
    } else {
      onComplete();
    }
  }, [currentSlide, totalSlides, onComplete]);

  /* ---------------- PREV ---------------- */
  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((p) => {
        const prev = p - 1;
        sessionRef.current.slide = prev;
        sessionRef.current.startTime = Date.now();
        return prev;
      });
      setProgress(0);
    }
  }, [currentSlide]);

  /* ---------------- AUTO PROGRESS (FIXED) ---------------- */
  useEffect(() => {
    if (isPaused || isLastSlide) return;

    const start = sessionRef.current.startTime;

    const animate = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);

      setProgress(next);

      if (next < 100) {
        progressRef.current = requestAnimationFrame(animate);
      } else {
        handleNext();
      }
    };

    progressRef.current = requestAnimationFrame(animate);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [currentSlide, isPaused, isLastSlide, handleNext]);

  /* ---------------- KEYBOARD ---------------- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "arrowright" || key === "d" || key === "enter") {
        handleNext();
      }

      if (key === "arrowleft" || key === "a") {
        handlePrev();
      }

      if (key === " ") {
        e.preventDefault();
        if (!isLastSlide) setIsPaused((p) => !p);
      }

      if (key === "escape") {
        onComplete();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev, isLastSlide, onComplete]);

  /* ---------------- TOUCH ---------------- */
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    touchStartX.current = e.clientX;

    if (!isLastSlide) setIsPaused(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isLastSlide) setIsPaused(false);
    if ((e.target as HTMLElement).closest("button, a")) return;

    const diff = e.clientX - touchStartX.current;

    if (Math.abs(diff) < 10) {
      const width = window.innerWidth;

      if (e.clientX < width / 2) handlePrev();
      else handleNext();
    }
  };

  /* ---------------- RENDER ---------------- */
  const renderSlide = () => {
    switch (currentSlide) {
      case SlideType.TITLE:
        return <TitleSlide data={data} />;
      case SlideType.VELOCITY:
        return <VelocitySlide data={data} />;
      case SlideType.GRID:
        return <GridSlide data={data} />;
      case SlideType.COMPOSITION:
        return <CompositionSlide data={data} />;
      case SlideType.ROUTINE:
        return <RoutineSlide data={data} />;
      case SlideType.PRODUCTIVITY:
        return <ProductivitySlide data={data} />;
      case SlideType.COMMUNITY:
        return <CommunitySlide data={data} />;
      case SlideType.LANGUAGES:
        return <LanguagesSlide data={data} />;
      case SlideType.TOP_REPOS:
        return <TopReposSlide data={data} />;
      case SlideType.REPO:
        return <RepoSlide data={data} />;
      case SlideType.POSTER:
        return <PosterSlide data={data} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden select-none ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
      </div>

      {/* TOP PROGRESS + CONTROLS (UNCHANGED) */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full overflow-hidden ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <motion.div
                className={`h-full ${isDark ? "bg-white" : "bg-black"}`}
                animate={{
                  width:
                    idx < currentSlide
                      ? "100%"
                      : idx === currentSlide
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
              // ✅ IMPORTANT: do NOT touch state here
              // prevents slide restart bug
            }}
            className={`p-2 rounded-xl border ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className={`p-2 rounded-xl border ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* SLIDE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      {/* BOTTOM NAV */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 z-50">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/10 dark:bg-white/10"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => setIsPaused((p) => !p)}
          className={`p-3 rounded-full ${
            isDark ? "bg-white/10" : "bg-black/10"
          }`}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/10 dark:bg-white/10"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
