import Image from "next/image";

export interface AwardData {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  unitType: "individual" | "team" | "unit";
  prizeValue: number;
  prizeValueSecondary: number | null;
}

export interface AwardCardTranslations {
  quantityLabel: string;
  valueLabel: string;
  perAward: string;
  perIndividual: string;
  perTeam: string;
  unitIndividual: string;
  unitTeam: string;
  unitUnit: string;
  orLabel: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value) + " VND";
}

function getUnitLabel(unitType: string, t: AwardCardTranslations): string {
  switch (unitType) {
    case "individual":
      return t.unitIndividual;
    case "team":
      return t.unitTeam;
    case "unit":
      return t.unitUnit;
    default:
      return t.unitIndividual;
  }
}

interface AwardCardProps {
  award: AwardData;
  translations: AwardCardTranslations;
  isLast?: boolean;
  priority?: boolean;
  index?: number;
}

export default function AwardCard({
  award,
  translations: t,
  isLast,
  priority,
  index = 0,
}: AwardCardProps) {
  const quantityStr = String(award.quantity).padStart(2, "0");
  const hasDualValue =
    award.prizeValueSecondary !== null && award.prizeValueSecondary > 0;
  const isEven = index % 2 === 1;

  return (
    <div
      id={award.slug}
      className="flex flex-col gap-12 xl:gap-20 scroll-mt-24"
    >
      {/* Card content — odd items: image left, even items: image right */}
      <div
        className={`flex flex-col lg:flex-row gap-6 xl:gap-10 ${isEven ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Award image */}
        <div className="shrink-0 mx-auto lg:mx-0">
          <Image
            src={award.imageUrl || "/images/login/saa-logo.png"}
            alt={award.name}
            width={336}
            height={336}
            className="w-[280px] h-[280px] xl:w-[336px] xl:h-[336px] rounded-3xl border border-[#FFEA9E] mix-blend-screen object-cover"
            style={{
              boxShadow: "0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287",
            }}
            loading={priority ? "eager" : "lazy"}
            {...(priority ? { priority: true } : {})}
          />
        </div>

        {/* Card content area */}
        <div className="flex-1 flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]">
          {/* Title */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/awards/icon-target.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 shrink-0"
            />
            <h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-8 text-[#FFEA9E]">
              {award.name}
            </h3>
          </div>

          {/* Description */}
          <p className="font-[family-name:var(--font-montserrat)] text-base font-bold leading-6 tracking-[0.5px] text-white text-justify">
            {award.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-[#2E3940]" />

          {/* Quantity section — all on one line */}
          <div className="flex items-center gap-4 flex-wrap">
            <Image
              src="/images/awards/icon-diamond.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 shrink-0"
            />
            <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-8 text-[#FFEA9E]">
              {t.quantityLabel}
            </span>
            <span className="font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[44px] text-white">
              {quantityStr}
            </span>
            <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 text-white">
              {getUnitLabel(award.unitType, t)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#2E3940]" />

          {/* Value section — left-aligned */}
          {hasDualValue ? (
            <>
              {/* First value */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/awards/icon-license.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 shrink-0"
                  />
                  <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-8 text-[#FFEA9E]">
                    {t.valueLabel}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[44px] text-white text-left">
                  {formatCurrency(award.prizeValue)}
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 text-white text-left">
                  {t.perIndividual}
                </p>
              </div>

              {/* "Hoặc" divider */}
              <div className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 text-[#2E3940]">
                  {t.orLabel}
                </span>
                <div className="flex-1 h-px bg-[#2E3940]" />
              </div>

              {/* Second value */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/awards/icon-license.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6 shrink-0"
                  />
                  <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-8 text-[#FFEA9E]">
                    {t.valueLabel}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[44px] text-white text-left">
                  {formatCurrency(award.prizeValueSecondary!)}
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 text-white text-left">
                  {t.perTeam}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/awards/icon-license.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 shrink-0"
                />
                <span className="font-[family-name:var(--font-montserrat)] text-2xl font-bold leading-8 text-[#FFEA9E]">
                  {t.valueLabel}
                </span>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-4xl font-bold leading-[44px] text-white text-left">
                {formatCurrency(award.prizeValue)}
              </p>
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold leading-5 text-white text-left">
                {t.perAward}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom divider between cards */}
      {!isLast && <div className="h-px bg-[#2E3940]" />}
    </div>
  );
}
