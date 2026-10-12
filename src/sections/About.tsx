import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaReact,
} from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";

const techStack = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: FaReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Vite", icon: SiVite },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 flex items-center gap-3 text-primary/90" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-px w-8 bg-border" />
            <span className="text-base font-medium">✦</span>
            <span className="h-px w-8 bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>

          <h2 id="about-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            About
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-text-muted">
            <p className="text-text">
              <span className="font-semibold text-text">We turn ideas into digital experiences.</span>
            </p>

            <p>
              WebForge is a team of three passionate developers building modern, responsive,
              and user-friendly websites for businesses, brands, and startups. We combine
              thoughtful design with reliable development to create digital experiences that look
              great, work smoothly, and grow with your vision.
            </p>

            <p>
              From clean interfaces to functional web applications, we focus on writing
              maintainable code, building accessible experiences, and delivering websites that work
              seamlessly across devices.
            </p>

            <p className="font-semibold text-text">
              Smart solutions. Quality development.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-primary">
            Our Tech Stack
          </h3>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-base text-text-muted">
            {techStack.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-muted px-3 py-2"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-border bg-bg-muted p-4">
            <p className="text-base font-semibold text-text">Let's Build Something Great</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Have an idea or a project in mind? We'd love to hear about it and help bring it to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
