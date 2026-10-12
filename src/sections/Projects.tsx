import ProjectStack from "../components/ProjectStack";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden py-20"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <SectionHeading
          id="projects-title"
          eyebrow="// featured work"
          title="Built to make an impact."
          description="A closer look at digital experiences we've designed and built for real businesses."
        />

        <div className="mt-12">
          <ProjectStack projects={projects} />
        </div>
      </div>
    </section>
  );
}
