import { ButtonLink } from "@/components/button-link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  text: string;
  imageSrc?: string;
  imagePosition?: string;
  primary?: {
    href: Parameters<typeof ButtonLink>[0]["href"];
    label: string;
  };
  secondary?: {
    href: Parameters<typeof ButtonLink>[0]["href"];
    label: string;
  };
};

export function PageHero({
  eyebrow,
  title,
  text,
  imageSrc = "/assets/matt-and-squirrel.jpg",
  imagePosition = "center",
  primary,
  secondary
}: PageHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border bg-[#17211f]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(15,29,25,0.92), rgba(15,29,25,0.72) 48%, rgba(15,29,25,0.32)), url('${imageSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: imagePosition
      }}
    >
      <div className="container-shell flex min-h-[390px] items-end py-10 sm:min-h-[430px] md:min-h-[520px] md:py-16">
        <div className="max-w-4xl text-white">
          {eyebrow ? <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f0b15e]">{eyebrow}</p> : null}
          <h1 className="mt-4 text-[2.75rem] font-black leading-[1] tracking-normal [text-wrap:balance] sm:text-5xl md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:mt-6 sm:text-lg sm:leading-8">{text}</p>
          {(primary || secondary) ? (
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              {primary ? <ButtonLink href={primary.href}>{primary.label}</ButtonLink> : null}
              {secondary ? <ButtonLink href={secondary.href} variant="clay">{secondary.label}</ButtonLink> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
