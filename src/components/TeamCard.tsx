import type { CSSProperties } from "react";
import type { TeamMember } from "../types";
import SocialLinks from "./SocialLinks";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type TeamCardProps = TeamMember & {
  style?: CSSProperties;
};

export default function TeamCard({ name, role, bio, avatar, links, style }: TeamCardProps) {
  return (
    <article
      style={style}
      className="animate-fade-up flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow"
    >
      {avatar ? (
        <img
          src={avatar}
          alt={`Portrait of ${name}`}
          width={96}
          height={96}
          loading="lazy"
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 font-heading text-2xl font-bold text-primary"
        >
          {getInitials(name)}
        </div>
      )}

      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="font-mono text-sm text-primary">{role}</p>
      <p className="mt-3 text-sm leading-relaxed">{bio}</p>

      {links.length > 0 && (
        <SocialLinks links={links} labelPrefix={`${name} on `} className="mt-5 text-xl" />
      )}
    </article>
  );
}
