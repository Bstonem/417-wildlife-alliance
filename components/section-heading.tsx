type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="section-kicker">{eyebrow}</p>
      ) : null}
      <h1 className="section-title mt-3">{title}</h1>
      {text ? <p className="body-large mt-4">{text}</p> : null}
    </div>
  );
}
