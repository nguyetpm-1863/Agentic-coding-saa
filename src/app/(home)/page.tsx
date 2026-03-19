import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { createClient } from "@/libs/supabase/server";
import { getTranslations } from "@/libs/i18n/translations";
import { Header } from "@/components/shared/header";
import { HeaderNav } from "@/components/shared/header-nav";
import { LanguageSelector } from "@/components/shared/language-selector";
import NotificationBell from "@/components/homepage/notification-bell";
import UserAvatar from "@/components/homepage/user-avatar";
import HeroSection from "@/components/homepage/hero-section";
import ContentSection from "@/components/homepage/content-section";
import AwardsSection from "@/components/homepage/awards-section";
import KudosSection from "@/components/homepage/kudos-section";
import { Footer } from "@/components/shared/footer";
import WidgetButton from "@/components/homepage/widget-button";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "vi";
  const t = getTranslations(locale);

  const targetDate = process.env.EVENT_DATE ?? "2026-03-26T18:30:00+07:00";
  const eventDate = process.env.EVENT_DATE_DISPLAY ?? "26/03/2026";
  const eventVenue =
    locale === "en" ? "Au Co Art Center" : "Trung tâm nghệ thuật Âu Cơ";

  const staticAwards = [
    {
      id: "top-talent",
      slug: "top-talent",
      name: t["awards.top_talent.name"],
      description: t["awards.top_talent.desc"],
      imageUrl: "/images/homepage/Picture-Award-Talent.png",
    },
    {
      id: "top-project",
      slug: "top-project",
      name: t["awards.top_project.name"],
      description: t["awards.top_project.desc"],
      imageUrl: "/images/homepage/Picture-Award-Project.png",
    },
    {
      id: "top-project-leader",
      slug: "top-project-leader",
      name: t["awards.top_project_leader.name"],
      description: t["awards.top_project_leader.desc"],
      imageUrl: "/images/homepage/Picture-Award-Leader.png",
    },
    {
      id: "best-manager",
      slug: "best-manager",
      name: t["awards.best_manager.name"],
      description: t["awards.best_manager.desc"],
      imageUrl: "/images/homepage/Picture-Award-Manager.png",
    },
    {
      id: "signature",
      slug: "signature-2025",
      name: t["awards.signature.name"],
      description: t["awards.signature.desc"],
      imageUrl: "/images/homepage/Picture-Award-Signature.png",
    },
    {
      id: "mvp",
      slug: "mvp",
      name: t["awards.mvp.name"],
      description: t["awards.mvp.desc"],
      imageUrl: "/images/homepage/Picture-Award-MVP.png",
    },
  ];

  const navSections = [
    { href: "/", label: t["nav.about_saa"] },
    { href: "/awards", label: t["nav.award_info"] },
    { href: "/kudos", label: t["nav.kudos"] },
  ];

  const footerNavLinks = [
    ...navSections.map((s) => ({
      label: s.label,
      href: s.href,
    })),
    { label: t["nav.common_criteria"], href: "#criteria" },
  ];

  return (
    <div className="min-h-screen bg-[#00101A]">
      <Header navContent={<HeaderNav links={navSections} />}>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <LanguageSelector currentLocale={locale} />
          <UserAvatar
            avatarUrl={user.user_metadata?.avatar_url ?? null}
            name={user.user_metadata?.full_name ?? user.email ?? "User"}
            isAdmin={user.app_metadata?.role === "admin"}
            currentPath="/"
          />
        </div>
      </Header>

      {/* Background wrapper: keyvisual constrained to 1392px height */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/homepage/keyvisual-bg.png"
          alt=""
          fill
          priority
          className="object-fill object-top !h-[1392px]"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1] !h-[1480px]"
          style={{
            background:
              "linear-gradient(12.34deg, #00101A 23.7%, rgba(0, 18, 29, 0.461538) 38.34%, rgba(0, 19, 32, 0) 48.92%)",
          }}
          aria-hidden="true"
        />

        <HeroSection
          targetDate={targetDate}
          eventDate={eventDate}
          eventVenue={eventVenue}
          eventTimeLabel={t["homepage.event_time_label"]}
          eventVenueLabel={t["homepage.event_venue_label"]}
          livestreamNote={t["homepage.livestream_note"]}
          comingSoonText={t["homepage.coming_soon"]}
          ctaAwardsText={t["homepage.cta_awards"]}
          ctaKudosText={t["homepage.cta_kudos"]}
          countdownLabels={{
            days: t["countdown.days"],
            hours: t["countdown.hours"],
            minutes: t["countdown.minutes"],
          }}
        />

        <ContentSection
          paragraph1={t["homepage.content_paragraph1"]}
          quote={t["homepage.content_quote"]}
          quoteAttribution={t["homepage.content_quote_attribution"]}
          paragraph2={t["homepage.content_paragraph2"]}
        />
      </div>

      <AwardsSection
        caption={t["awards.caption"]}
        title={t["awards.title"]}
        detailText={t["awards.detail_text"]}
        awards={staticAwards}
      />

      <KudosSection
        subtitle={t["kudos.subtitle"]}
        title={t["kudos.title"]}
        newFeatureLabel={t["kudos.new_feature_label"]}
        description={t["kudos.homepage_description"]}
        detailButtonText={t["kudos.detail_button"]}
      />

      <Footer copyright={t["footer.copyright"]} navLinks={footerNavLinks} />

      <WidgetButton href="/kudos" label={t["kudos.detail_button"]} />
    </div>
  );
}
