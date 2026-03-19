import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import { getTranslations } from "@/libs/i18n/translations";
import CountdownTimer from "@/components/countdown/countdown-timer";

export default async function CountdownPage() {
  // FR-004: Authenticated users skip this page entirely
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "vi";
  const t = getTranslations(locale);

  return (
    <div className="relative min-h-screen bg-[#00101A] flex items-center justify-center overflow-hidden">
      {/* Background image — next/image with priority per TR-007 */}
      <Image
        src="/images/login/keyvisual-bg.png"
        alt=""
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
      />

      {/* Gradient overlay - 18deg per design spec */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 md:px-12 md:py-16 lg:px-20 lg:py-24 xl:px-36 xl:py-24 gap-12 md:gap-20 lg:gap-[100px] xl:gap-[120px]">
        <h1 className="font-[family-name:var(--font-montserrat)] text-xl md:text-[28px] md:leading-9 lg:text-4xl font-bold leading-7 lg:leading-[48px] text-white text-center">
          {t["countdown.title"]}
        </h1>

        <CountdownTimer
          durationSeconds={60}
          translations={{
            hours: t["countdown.hours"],
            minutes: t["countdown.minutes"],
            seconds: t["countdown.seconds"],
          }}
        />
      </div>
    </div>
  );
}
