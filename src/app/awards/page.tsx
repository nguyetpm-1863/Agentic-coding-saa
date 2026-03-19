import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/libs/supabase/server";
import { getTranslations } from "@/libs/i18n/translations";
import { Header } from "@/components/shared/header";
import { HeaderNav } from "@/components/shared/header-nav";
import { LanguageSelector } from "@/components/shared/language-selector";
import { Footer } from "@/components/shared/footer";
import NotificationBell from "@/components/homepage/notification-bell";
import UserAvatar from "@/components/homepage/user-avatar";
import KeyVisual from "@/components/awards/key-visual";
import AwardSystem from "@/components/awards/award-system";
import KudosSection from "@/components/homepage/kudos-section";
import { getAwardsData } from "@/libs/constants/awards";
import type { AwardCardTranslations } from "@/components/awards/award-card";

export default async function AwardsPage() {
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

  const formattedAwards = getAwardsData(t);

  const cardTranslations: AwardCardTranslations = {
    quantityLabel: t["awards.quantity_label"],
    valueLabel: t["awards.value_label"],
    perAward: t["awards.per_award"],
    perIndividual: t["awards.per_individual"],
    perTeam: t["awards.per_team"],
    unitIndividual: t["awards.unit_individual"],
    unitTeam: t["awards.unit_team"],
    unitUnit: t["awards.unit_unit"],
    orLabel: t["awards.or_label"],
  };

  const navItems = [
    { key: "about_saa", label: t["nav.about_saa"], href: "/" },
    { key: "award_info", label: t["nav.award_info"], href: "/awards" },
    { key: "kudos", label: t["nav.kudos"], href: "/kudos" },
  ];

  const footerNavItems = [
    ...navItems,
    {
      key: "common_criteria",
      label: t["nav.common_criteria"],
      href: "#criteria",
    },
  ];

  const headerNavSlot = (
    <HeaderNav links={navItems.map(({ label, href }) => ({ label, href }))} />
  );

  return (
    <div className="min-h-screen bg-[#00101A]">
      <Header navContent={headerNavSlot}>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <LanguageSelector currentLocale={locale} />
          <UserAvatar
            avatarUrl={user.user_metadata?.avatar_url ?? null}
            name={user.user_metadata?.full_name ?? user.email ?? "User"}
            isAdmin={user.app_metadata?.role === "admin"}
            currentPath="/awards"
          />
        </div>
      </Header>

      <KeyVisual
        caption="Sun* Annual Awards 2025"
        title={t["awards.system_title"]}
      />

      <div className="relative z-10 px-4 py-8 md:px-12 md:py-16 lg:px-20 lg:py-16 xl:px-36 xl:py-24 flex flex-col gap-12 md:gap-20 lg:gap-[80px] xl:gap-[120px] max-w-[1440px] mx-auto text-center">
        <AwardSystem
          awards={formattedAwards}
          translations={cardTranslations}
        />
      </div>

      <KudosSection
        subtitle={t["kudos.subtitle"]}
        title={t["kudos.title"]}
        newFeatureLabel={t["kudos.new_feature_label"]}
        description={t["kudos.homepage_description"]}
        detailButtonText={t["kudos.detail_button"]}
      />

      <Footer
        copyright={t["footer.copyright"]}
        navLinks={footerNavItems.map((item) => ({
          label: item.label,
          href: item.href,
          isActive: item.key === "award_info",
        }))}
      />
    </div>
  );
}
