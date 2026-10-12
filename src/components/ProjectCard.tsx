import { ArrowUpRight, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import type { Project } from "../types";

const technologyIcons: Record<string, ComponentType<{ className?: string }>> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Redux Toolkit": SiRedux,
  EmailJS: Mail,
  Vercel: SiVercel,
  Vite: SiVite,
};

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  liveUrl,
  repoUrl,
}: Project) {
  const cleanTitle = title.trim();
  const technologies = tags.flatMap((tag) =>
    tag in technologyIcons ? [{ tag, Icon: technologyIcons[tag] }] : [],
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-md transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      <div className="group/image relative aspect-[16/10] overflow-hidden bg-bg-muted">
        {image ? (
          <img
            src={image}
            alt={`${cleanTitle} website preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-105"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--root-primary)_35%,transparent),transparent_60%),linear-gradient(135deg,var(--root-surface),var(--root-bg-muted))]">
            <div
              className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative w-[72%] overflow-hidden rounded-xl border border-white/20 bg-bg/80 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover/image:scale-[1.03]">
              <div className="flex h-8 items-center gap-1.5 border-b border-border/70 px-3">
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span className="h-2 w-2 rounded-full bg-text-muted/30" />
                <span className="h-2 w-2 rounded-full bg-text-muted/30" />
                <span className="ml-3 h-2 w-1/3 rounded-full bg-bg-muted" />
              </div>
              <div className="space-y-4 p-5 sm:p-7">
                <div className="h-4 w-3/5 rounded-full bg-text/75" />
                <div className="h-3 w-2/5 rounded-full bg-primary/70" />
                <div className="h-2 w-full rounded-full bg-text-muted/20" />
                <div className="h-2 w-4/5 rounded-full bg-text-muted/20" />
                <div className="flex gap-2 pt-2">
                  <span className="h-6 w-16 rounded-md bg-primary/70" />
                  <span className="h-6 w-16 rounded-md border border-border bg-surface/80" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100 group-focus-within/image:opacity-100 [@media(hover:none)]:opacity-100"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100 group-focus-within/image:opacity-100 [@media(hover:none)]:opacity-100">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cleanTitle} source code on GitHub`}
              className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-white hover:text-bg-dark group-hover/image:translate-y-0 group-focus-within/image:translate-y-0 [@media(hover:none)]:translate-y-0"
            >
              <FaGithub className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cleanTitle} live website`}
              className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-primary text-on-primary shadow-glow transition duration-300 hover:scale-110 hover:bg-primary-hover group-hover/image:translate-y-0 group-focus-within/image:translate-y-0 [@media(hover:none)]:translate-y-0"
            >
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-text transition-colors group-hover:text-primary">
          {cleanTitle}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
          {description}
        </p>

        <ul
          aria-label={`${cleanTitle} technologies`}
          className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border/80 pt-4"
        >
          {technologies.map(({ tag, Icon }) => (
            <li
              key={tag}
              aria-label={tag}
              title={tag}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-muted text-text-muted transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
