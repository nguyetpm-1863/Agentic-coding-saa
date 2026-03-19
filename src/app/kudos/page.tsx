import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/libs/supabase/server";
import { getTranslations } from "@/libs/i18n/translations";
import {
  getKudosFeed,
  getHashtags,
  getDepartments,
  getHighlightKudos,
  getSpotlightData,
  getUserStats,
} from "@/libs/kudos/queries";
import { Header } from "@/components/shared/header";
import { HeaderNav } from "@/components/shared/header-nav";
import { LanguageSelector } from "@/components/shared/language-selector";
import { Footer } from "@/components/shared/footer";
import NotificationBell from "@/components/homepage/notification-bell";
import UserAvatar from "@/components/homepage/user-avatar";
import { HighlightKudos } from "@/components/kudos/highlight-kudos";
import { SpotlightBoard } from "@/components/kudos/spotlight-board";
import { AllKudos } from "@/components/kudos/all-kudos";
import { KudosHeroWithModal } from "@/components/kudos/kudos-hero-with-modal";
import type { Hashtag as HashtagType } from "@/types/hashtag";
import type { Department } from "@/types/department";

export default async function KudosPage() {
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

  // Fetch all initial data in parallel
  const [
    feedResult,
    hashtagsRaw,
    departmentsRaw,
    highlightsResult,
    spotlightData,
    userStats,
  ] = await Promise.all([
    getKudosFeed(undefined, 10),
    getHashtags(locale),
    getDepartments(),
    getHighlightKudos(1, 50),
    getSpotlightData(),
    getUserStats(user.id),
  ]);

  // Map hashtags to the format expected by filter dropdowns
  const hashtags: HashtagType[] = hashtagsRaw.map((h) => ({
    id: h.id,
    key: h.key,
    displayText: locale === "en" ? h.displayTextEn : h.displayTextVi,
  }));

  const departments: Department[] = departmentsRaw.map((d) => ({
    id: d.id,
    name: d.name,
  }));

  const navLinks = [
    { label: t["nav.about_saa"], href: "/" },
    { label: t["nav.award_info"], href: "/awards" },
    { label: t["nav.kudos"], href: "/kudos" },
  ];

  const footerNavLinks = [
    { label: t["nav.about_saa"], href: "/" },
    { label: t["nav.award_info"], href: "/awards" },
    { label: t["nav.kudos"], href: "/kudos" },
    { label: t["nav.common_criteria"], href: "#criteria" },
  ];

  return (
    <div className="min-h-screen bg-[#00101A]">
      <Header navContent={<HeaderNav links={navLinks} />}>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <LanguageSelector currentLocale={locale} />
          <UserAvatar
            avatarUrl={user.user_metadata?.avatar_url ?? null}
            name={user.user_metadata?.full_name ?? user.email ?? "User"}
            isAdmin={user.app_metadata?.role === "admin"}
            currentPath="/kudos"
          />
        </div>
      </Header>

      <main>
        <KudosHeroWithModal locale={locale} />

        <HighlightKudos
          initialHighlights={highlightsResult.items}
          initialPage={highlightsResult.currentPage}
          initialTotalPages={highlightsResult.totalPages}
          hashtags={hashtags}
          departments={departments}
          locale={locale}
          hashtagLabel={t["hashtag.filter.label"]}
          departmentLabel={t["department.filter.label"]}
        />

        <SpotlightBoard data={spotlightData} locale={locale} />

        <AllKudos
          initialKudos={feedResult.items}
          initialCursor={feedResult.nextCursor}
          initialHasMore={feedResult.hasMore}
          stats={userStats}
          topReceivers={spotlightData.topReceivers}
          locale={locale}
        />
      </main>

      <Footer copyright={t["footer.copyright"]} navLinks={footerNavLinks} />
    </div>
  );
}
