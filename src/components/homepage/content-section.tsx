import Image from "next/image";

interface ContentSectionProps {
  paragraph1: string;
  quote: string;
  quoteAttribution: string;
  paragraph2: string;
}

export default function ContentSection({
  paragraph1,
  quote,
  quoteAttribution,
  paragraph2,
}: ContentSectionProps) {
  return (
    <section className="relative z-10 px-4 md:px-12 lg:px-[104px]">
      <div className="flex flex-col gap-8 max-w-[1152px] mx-auto">
        {/* ROOT FURTHER title images */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/homepage/root-text.png"
            alt=""
            width={189}
            height={67}
            className="w-[140px] md:w-[189px] h-auto"
          />
          <Image
            src="/images/homepage/further-text.png"
            alt=""
            width={290}
            height={67}
            className="w-[210px] md:w-[290px] h-auto"
          />
        </div>

        {/* Content paragraphs */}
        <div className="flex flex-col gap-8 font-[family-name:var(--font-montserrat)] text-lg md:text-2xl font-bold leading-7 md:leading-8 text-white">
          {/* Paragraph 1 */}
          <div className="whitespace-pre-line">{paragraph1}</div>

          {/* Centered quote */}
          <blockquote className="text-center italic">
            <p>{quote}</p>
            <p className="text-base md:text-xl font-bold leading-8 mt-1">
              {quoteAttribution}
            </p>
          </blockquote>

          {/* Paragraph 2 */}
          <div className="whitespace-pre-line">{paragraph2}</div>
        </div>
      </div>
    </section>
  );
}
