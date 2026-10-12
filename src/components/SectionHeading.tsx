interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  const hasEyebrow = Boolean(eyebrow?.trim());

  return (
    <div className="mx-auto max-w-2xl text-center">
      {hasEyebrow ? (
        <p className="font-mono text-sm text-primary">{eyebrow}</p>
      ) : (
        <div className="mb-3 flex items-center justify-center gap-3 text-primary/90" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-px w-8 bg-border" />
          <span className="text-base font-medium">✦</span>
          <span className="h-px w-8 bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      )}

      <h2 id={id} className={`text-3xl font-bold tracking-tight sm:text-4xl ${hasEyebrow ? "mt-2" : "mt-0"}`}>
        {title}
      </h2>
      {description && <p className="mt-4 text-lg">{description}</p>}
    </div>
  );
}
