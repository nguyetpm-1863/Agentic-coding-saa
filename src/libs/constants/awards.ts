import type { AwardData } from "@/components/awards/award-card";

interface AwardDefinition {
  id: string;
  slug: string;
  nameKey: string;
  descKey: string;
  imageUrl: string;
  quantity: number;
  unitType: "individual" | "team" | "unit";
  prizeValue: number;
  prizeValueSecondary: number | null;
}

const AWARD_DEFINITIONS: AwardDefinition[] = [
  {
    id: "top-talent",
    slug: "top-talent",
    nameKey: "awards.top_talent.name",
    descKey: "awards.top_talent.desc",
    imageUrl: "/images/homepage/Picture-Award-Talent.png",
    quantity: 10,
    unitType: "individual",
    prizeValue: 7000000,
    prizeValueSecondary: null,
  },
  {
    id: "top-project",
    slug: "top-project",
    nameKey: "awards.top_project.name",
    descKey: "awards.top_project.desc",
    imageUrl: "/images/homepage/Picture-Award-Project.png",
    quantity: 2,
    unitType: "team",
    prizeValue: 15000000,
    prizeValueSecondary: null,
  },
  {
    id: "top-project-leader",
    slug: "top-project-leader",
    nameKey: "awards.top_project_leader.name",
    descKey: "awards.top_project_leader.desc",
    imageUrl: "/images/homepage/Picture-Award-Leader.png",
    quantity: 3,
    unitType: "individual",
    prizeValue: 7000000,
    prizeValueSecondary: null,
  },
  {
    id: "best-manager",
    slug: "best-manager",
    nameKey: "awards.best_manager.name",
    descKey: "awards.best_manager.desc",
    imageUrl: "/images/homepage/Picture-Award-Manager.png",
    quantity: 1,
    unitType: "individual",
    prizeValue: 10000000,
    prizeValueSecondary: null,
  },
  {
    id: "signature-2025",
    slug: "signature-2025",
    nameKey: "awards.signature.name",
    descKey: "awards.signature.desc",
    imageUrl: "/images/homepage/Picture-Award-Signature.png",
    quantity: 1,
    unitType: "individual",
    prizeValue: 5000000,
    prizeValueSecondary: 8000000,
  },
  {
    id: "mvp",
    slug: "mvp",
    nameKey: "awards.mvp.name",
    descKey: "awards.mvp.desc",
    imageUrl: "/images/homepage/Picture-Award-MVP.png",
    quantity: 1,
    unitType: "individual",
    prizeValue: 15000000,
    prizeValueSecondary: null,
  },
];

export function getAwardsData(
  t: Record<string, string>,
): AwardData[] {
  return AWARD_DEFINITIONS.map((def) => ({
    id: def.id,
    slug: def.slug,
    name: t[def.nameKey] ?? def.slug,
    description: t[def.descKey] ?? "",
    imageUrl: def.imageUrl,
    quantity: def.quantity,
    unitType: def.unitType,
    prizeValue: def.prizeValue,
    prizeValueSecondary: def.prizeValueSecondary,
  }));
}
