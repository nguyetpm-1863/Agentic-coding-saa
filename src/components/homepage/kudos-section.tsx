import Image from "next/image";
import Link from "next/link";

interface KudosSectionProps {
	subtitle: string;
	title: string;
	newFeatureLabel: string;
	description: string;
	detailButtonText: string;
}

export default function KudosSection({
	subtitle,
	title,
	newFeatureLabel,
	description,
	detailButtonText,
}: KudosSectionProps) {
	return (
		<section
			id="kudos"
			className="px-4 md:px-12 lg:px-20 xl:px-36 py-16 md:py-20 lg:py-24"
		>
			{/* Inner container matching Figma: 1120px max, rounded-2xl, dark bg with background image */}
			<div className="relative mx-auto max-w-[1120px] rounded-2xl overflow-hidden">
				{/* Background image */}
				<Image
					src="/images/homepage/kudos-bg.png"
					alt=""
					fill
					className="object-cover"
					sizes="100vw"
					aria-hidden="true"
				/>

				<div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-0 items-center min-h-[500px]">
					{/* Left half: Content */}
					<div className="flex flex-col gap-4 lg:w-1/2 px-8 py-10 lg:px-16 lg:py-12">
						<p className="font-[family-name:var(--font-montserrat)] text-lg md:text-2xl font-bold text-white leading-8">
							{subtitle}
						</p>
						<h2 className="font-[family-name:var(--font-montserrat)] text-3xl md:text-4xl lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px] tracking-[-0.25px]">
							{title}
						</h2>
						<div className="mt-2">
							<p className="font-[family-name:var(--font-montserrat)] text-base font-bold text-white leading-6 tracking-[0.5px] uppercase">
								{newFeatureLabel}
							</p>
							<p className="font-[family-name:var(--font-montserrat)] text-base font-bold text-white leading-6 tracking-[0.5px] text-justify mt-1">
								{description}
							</p>
						</div>
						<div className="mt-4">
							<Link
								href="/kudos"
								className="inline-flex items-center gap-2 rounded bg-[#FFEA9E] px-4 py-4 font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] leading-6 tracking-[0.15px] hover:bg-[#E8D68E] active:bg-[#D4C27E] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
							>
								{detailButtonText}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M4.667 11.333L11.333 4.667M11.333 4.667H4.667M11.333 4.667V11.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</Link>
						</div>
					</div>

					{/* Right half: Kudos image */}
					<div className="lg:w-1/2 flex items-center justify-center px-8 py-10 lg:px-0 lg:py-0">
						<Image
							src="/images/homepage/kudos.png"
							alt="Sun* Kudos"
							width={364}
							height={72}
							className="object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
