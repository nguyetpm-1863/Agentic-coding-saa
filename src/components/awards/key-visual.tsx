import Image from "next/image";

interface KeyVisualProps {
  caption: string;
  title: string;
}

export default function KeyVisual({ caption, title }: KeyVisualProps) {
  return (
    <div className="relative w-full min-h-[300px] md:min-h-[400px] xl:min-h-[547px] flex flex-col justify-end">
      {/* Background image — awards-specific */}
      <Image
        src="/images/awards/keyvisual-award-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[400px] md:h-[500px] xl:h-[627px] z-[1]"
        style={{
          background:
            "linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%)",
        }}
      />

      {/* ROOT FURTHER text overlays — left-aligned */}
      <div className="relative z-[2] px-4 md:px-12 lg:px-20 xl:px-36 pt-20 md:pt-24 xl:pt-28">
        <div className="flex flex-col items-start">
          <Image
            src="/images/homepage/root-text.png"
            alt=""
            width={189}
            height={67}
            className="w-[120px] md:w-[160px] xl:w-[189px] h-auto"
          />
          <Image
            src="/images/homepage/further-text.png"
            alt=""
            width={290}
            height={67}
            className="w-[180px] md:w-[240px] xl:w-[290px] h-auto"
          />
        </div>
      </div>

      {/* Section title — overlaid at bottom of banner */}
      <div className="relative z-[2] px-4 py-8 md:px-12 md:py-12 lg:px-20 xl:px-36 xl:py-16 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col gap-4 w-full text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-lg md:text-2xl font-bold leading-8 text-white">
            {caption}
          </p>
          <div className="h-px bg-[#2E3940]" />
          <h1 className="font-[family-name:var(--font-montserrat)] text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] lg:text-[52px] xl:text-[57px] xl:leading-[64px] font-bold tracking-[-0.25px] text-[#FFEA9E]">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
