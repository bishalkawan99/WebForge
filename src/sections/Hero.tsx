import { ArrowRight } from "lucide-react";
import { SiReact, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import PixelCanvas from "../components/PixelCanvas";

const technologies = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Vite", icon: SiVite },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 pb-36 pt-24 sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <PixelCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--root-bg)_0%,color-mix(in_srgb,var(--root-bg)_75%,transparent)_48%,transparent_100%)] opacity-90" />
      </div>

      <div className="container-page relative z-10 mx-auto text-center">
        <div className="mx-auto max-w-6xl">
          <h1 className="animate-fade-up hero-glass-text flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-5xl leading-[0.98] sm:gap-x-6 sm:text-7xl md:text-7xl lg:text-8xl 2xl:text-9xl">
            <span className="font-serif font-medium italic">Digital</span>
            <span className="font-heading font-extrabold tracking-[-0.075em]">
              experiences.
            </span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg md:text-xl"
            style={{ animationDelay: "150ms" }}
          >
            We design and build fast, thoughtful websites that help ambitious
            businesses stand out and grow.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-6 font-semibold text-on-primary shadow-glow ring-1 ring-primary/20 transition duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
            >
              See our work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-xl border border-border bg-surface/70 px-6 font-semibold text-text shadow-sm backdrop-blur transition duration-200 hover:scale-[1.03] hover:border-primary active:scale-[0.98]"
            >
              Hire us
            </a>
          </div>
        </div>
      </div>

      <div className="animate-fade-up absolute inset-x-0 bottom-7 z-10">
        <p className="mb-5 text-center text-[0.65rem] font-medium uppercase tracking-[0.24em] text-text-muted/80">
          Crafted with modern tools
        </p>
        <div className="relative mx-auto max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="hero-tech-marquee flex w-max items-center py-2">
            {[0, 1].map((group) => (
              <ul
                key={group}
                aria-hidden={group === 1}
                className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
              >
                {technologies.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-text-muted/80 transition-colors hover:text-text"
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
