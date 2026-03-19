import { redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createClient } from "@/libs/supabase/server";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { LoginButton } from "@/components/login/login-button";
import { LanguageSelector } from "@/components/shared/language-selector";
import { getTranslations, DEFAULT_LOCALE } from "@/libs/i18n/translations";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? DEFAULT_LOCALE;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#00101A] relative overflow-hidden flex flex-col animate-fade-in">
      {/* Key Visual Background */}
      <Image
        src="/images/login/keyvisual-bg.png"
        alt=""
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
      />

      {/* Left Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00101A] via-[#00101A] via-25% to-transparent" />

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#00101A] from-22% to-transparent to-52%" />

      {/* Header */}
      <div className="relative z-50">
        <Header>
          <LanguageSelector currentLocale={locale} />
        </Header>
      </div>

      {/* Hero Content */}
      <main className="relative z-20 flex-1 flex flex-col justify-center px-4 md:px-12 lg:px-20 xl:px-36 pt-20 pb-8 md:py-24 lg:py-24">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-20">
          {/* ROOT FURTHER Logo */}
          <div>
            <Image
              src="/images/login/root-further-logo.png"
              alt=""
              width={451}
              height={200}
              className="w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[451px] h-auto"
              priority
            />
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col gap-6 pl-0 lg:pl-4">
            <p className="font-[family-name:var(--font-montserrat)] text-base md:text-lg lg:text-xl font-bold leading-7 md:leading-8 lg:leading-10 tracking-[0.5px] text-white max-w-full md:max-w-[480px]">
              {t["login.description.line1"]}
              <br />
              {t["login.description.line2"]}
            </p>

            <Suspense fallback={null}>
              <LoginButton />
            </Suspense>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-20">
        <Footer copyright={t["footer.copyright"]} />
      </div>
    </div>
  );
}
