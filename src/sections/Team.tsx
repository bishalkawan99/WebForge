import SectionHeading from "../components/SectionHeading";
import TeamCard from "../components/TeamCard";
import { team } from "../data/content";

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="bg-bg-muted py-24">
      <div className="container-page">
        <SectionHeading
          id="team-title"
          title="Team"
          description="Three people, one goal: websites you're proud to launch."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((member, index) => (
            <TeamCard
              key={member.id}
              {...member}
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
