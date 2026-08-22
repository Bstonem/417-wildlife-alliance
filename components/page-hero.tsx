import { ButtonLink } from "@/components/button-link";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  text: string;
  imageSrc?: string;
  imageSrcMobile?: string;
  imagePosition?: string;
  imagePositionMobile?: string;
  overlayEnd?: number;
  gradientMidStop?: number;
  gradientEndStop?: number;
  minHeightClassName?: string;
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
  imageSrcMobile,
  imagePosition = "center",
  imagePositionMobile,
  overlayEnd = 0.32,
  gradientMidStop = 48,
  gradientEndStop = 100,
  minHeightClassName = "min-h-[390px] sm:min-h-[430px] md:min-h-[520px]",
  primary,
  secondary
}: PageHeroProps) {
  const gradient = (src: string) =>
    `linear-gradient(90deg, rgba(15,29,25,0.92), rgba(15,29,25,0.72) ${gradientMidStop}%, rgba(15,29,25,${overlayEnd}) ${gradientEndStop}%), url('${src}')`;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-[#17211f]">
      {imageSrcMobile ? (
        <>
          <div
            className="absolute inset-0 md:hidden"
            style={{
              backgroundImage: gradient(imageSrcMobile),
              backgroundSize: "cover",
              backgroundPosition: imagePositionMobile || imagePosition
            }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{ backgroundImage: gradient(imageSrc), backgroundSize: "cover", backgroundPosition: imagePosition }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: gradient(imageSrc), backgroundSize: "cover", backgroundPosition: imagePosition }}
        />
      )}
      <div className={cn("container-shell relative z-10 flex items-end py-10 md:py-16", minHeightClassName)}>
        <div className="max-w-4xl text-white">
          {eyebrow ? <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f0b15e]">{eyebrow}</p> : null}
          <h1 className="mt-4 text-[2.75rem] font-black leading-[1.1] tracking-normal [text-wrap:balance] sm:text-5xl sm:leading-[1] md:text-7xl">{title}</h1>
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
