import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

interface ProjectStackProps {
  projects: Project[];
}

function wrapIndex(index: number, length: number) {
  return length ? ((index % length) + length) % length : 0;
}

function getOffset(index: number, activeIndex: number, length: number) {
  const rawOffset = index - activeIndex;
  if (length <= 2) return rawOffset;
  const wrappedOffset = rawOffset > 0 ? rawOffset - length : rawOffset + length;
  return Math.abs(wrappedOffset) < Math.abs(rawOffset)
    ? wrappedOffset
    : rawOffset;
}

export default function ProjectStack({ projects }: ProjectStackProps) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(800);
  const [paused, setPaused] = useState(false);
  const length = projects.length;
  const activeIndex = wrapIndex(selectedIndex, length);
  const cardWidth = Math.min(680, Math.max(300, stageWidth * 0.82));
  const cardHeight = Math.max(420, cardWidth * 0.76);
  const cardSpacing = Math.max(100, cardWidth * 0.52);
  const maxOffset = Math.min(2, Math.floor((length - 1) / 2));
  const stepDegrees = maxOffset ? 24 / maxOffset : 0;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) setStageWidth(entry.contentRect.width);
    });
    resizeObserver.observe(stage);
    return () => resizeObserver.disconnect();
  }, []);

  const move = useCallback(
    (direction: number) => {
      setSelectedIndex((index) => wrapIndex(index + direction, length));
    },
    [length],
  );

  useEffect(() => {
    if (length < 2 || paused || reduceMotion) return;

    const interval = window.setInterval(() => move(1), 6000);
    return () => window.clearInterval(interval);
  }, [length, move, paused, reduceMotion]);

  if (!length) return null;

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 70 || info.velocity.x > 500) move(-1);
    else if (info.offset.x < -70 || info.velocity.x < -500) move(1);
  };

  return (
    <div
      className="mx-auto w-full max-w-6xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        ref={stageRef}
        role="region"
        aria-label="Featured projects"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        className="relative mx-auto flex w-full items-end justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        style={{
          height: Math.max(390, cardHeight + 70),
          perspective: "1100px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-48 w-[70%] rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/20 blur-3xl"
          aria-hidden="true"
        />

        <AnimatePresence initial={false}>
          {projects.map((project, index) => {
              const offset = getOffset(index, activeIndex, length);
              const distance = Math.abs(offset);
              if (distance > maxOffset) return null;

              const active = offset === 0;

              return (
                <motion.div
                  key={project.id}
                  role="group"
                  aria-label={`${project.title.trim()}, ${index + 1} of ${length}`}
                  aria-roledescription="slide"
                  className={`absolute bottom-3 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl ${
                    active
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer"
                  }`}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 10 - distance,
                    transformStyle: "preserve-3d",
                    touchAction: active ? "pan-y" : "auto",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: offset * cardSpacing,
                          y: distance * 10 + 40,
                          scale: 0.92,
                        }
                  }
                  animate={{
                    opacity: active ? 1 : 0.58,
                    x: offset * cardSpacing,
                    y: distance * 12 + (active ? -16 : 0),
                    rotateZ: offset * stepDegrees,
                    rotateX: active ? 0 : 9,
                    scale: active ? 1 : 0.92,
                  }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 280, damping: 28 }
                  }
                  drag={active && !reduceMotion ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={active ? handleDragEnd : undefined}
                  onClick={() => setSelectedIndex(index)}
                  tabIndex={active ? 0 : -1}
                >
                  <ProjectCard {...project} />
                </motion.div>
              );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div className="flex items-center gap-2.5">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Show ${project.title.trim()}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-7 bg-primary"
                  : "w-2 bg-text-muted/35 hover:bg-text-muted/70"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
