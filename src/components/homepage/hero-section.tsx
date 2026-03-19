import Image from "next/image";
import CountdownTimer from "@/components/homepage/countdown-timer";

interface HeroSectionProps {
  targetDate: string;
  eventDate: string;
  eventVenue: string;
  eventTimeLabel: string;
  eventVenueLabel: string;
  livestreamNote: string;
  comingSoonText: string;
  ctaAwardsText: string;
  ctaKudosText: string;
  countdownLabels: {
    days: string;
    hours: string;
    minutes: string;
  };
}

export default function HeroSection({
  targetDate,
  eventDate,
  eventVenue,
  eventTimeLabel,
  eventVenueLabel,
  livestreamNote,
  comingSoonText,
  ctaAwardsText,
  ctaKudosText,
  countdownLabels,
}: HeroSectionProps) {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-20 xl:px-36 py-8 md:py-16 lg:py-24"
    >
      {/* Content — left-aligned per Figma design */}
      <div className="flex flex-col items-start gap-6 md:gap-8 align-middle">
        {/* ROOT FURTHER Logo */}
        <Image
          src="/images/login/root-further-logo.png"
          alt=""
          width={451}
          height={200}
          className="w-[240px] md:w-[320px] lg:w-[400px] xl:w-[451px] h-auto"
        />

        {/* Coming soon subtitle */}
        <p className="font-[family-name:var(--font-montserrat)] text-base md:text-lg lg:text-xl font-bold text-white">
          {comingSoonText}
        </p>

        {/* Countdown */}
        <CountdownTimer targetDate={targetDate} labels={countdownLabels} />

        {/* Event info */}
        <div className="flex flex-col gap-2 font-[family-name:var(--font-montserrat)]">
          <div className="flex flex-col md:flex-row md:gap-[60px] gap-1">
            <p className="flex items-baseline gap-1">
              <span className="text-sm md:text-base font-bold text-white leading-6 tracking-[0.15px]">
                {eventTimeLabel}
              </span>
              <span className="text-lg md:text-2xl font-bold text-[#FFEA9E] leading-8">
                {eventDate}
              </span>
            </p>
            <p className="flex items-baseline gap-1">
              <span className="text-sm md:text-base font-bold text-white leading-6 tracking-[0.15px]">
                {eventVenueLabel}
              </span>
              <span className="text-lg md:text-2xl font-bold text-[#FFEA9E] leading-8">
                {eventVenue}
              </span>
            </p>
          </div>
          <p className="text-sm md:text-base font-bold text-white leading-6 tracking-[0.5px]">
            {livestreamNote}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-2">
          <a
            href="/awards"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFEA9E]/10 border border-[#998C5F] px-6 py-4 text-white font-[family-name:var(--font-montserrat)] font-bold text-base md:text-[22px] md:leading-7 hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            {ctaAwardsText}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5.83334 14.1667L14.1667 5.83334M14.1667 5.83334H5.83334M14.1667 5.83334V14.1667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="/kudos"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFEA9E]/10 border border-[#998C5F] px-6 py-4 text-white font-[family-name:var(--font-montserrat)] font-bold text-base md:text-[22px] md:leading-7 hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            {ctaKudosText}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5.83334 14.1667L14.1667 5.83334M14.1667 5.83334H5.83334M14.1667 5.83334V14.1667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
