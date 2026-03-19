import AwardCard from "@/components/homepage/award-card";

interface Award {
	id: string;
	slug: string;
	name: string;
	description: string;
	imageUrl: string;
}

interface AwardsSectionProps {
	caption: string;
	title: string;
	detailText: string;
	awards: Award[];
}

export default function AwardsSection({ caption, title, detailText, awards }: AwardsSectionProps) {
	return (
		<section
			id="awards"
			className="px-4 md:px-12 lg:px-20 xl:px-36 py-16 md:py-20 lg:py-24"
		>
			{/* C1: Header with 16px gap between caption, divider, title */}
			<div className="flex flex-col gap-4">
				<p className="font-[family-name:var(--font-montserrat)] text-lg md:text-2xl font-bold text-white leading-8 tracking-[0px]">
					{caption}
				</p>
				<div className="h-px w-full bg-[#2E3940]" aria-hidden="true" />
				<h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px] tracking-[-0.25px]">
					{title}
				</h2>
			</div>
			{/* C2: Award grid — 108px horizontal gap, 80px vertical gap, 80px margin-top */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-12 lg:gap-x-[108px] gap-y-16 lg:gap-y-20 mt-12 lg:mt-20">
				{awards.map((award) => (
					<AwardCard
						key={award.id}
						slug={award.slug}
						name={award.name}
						description={award.description}
						imageUrl={award.imageUrl}
						detailText={detailText}
					/>
				))}
			</div>
		</section>
	);
}
