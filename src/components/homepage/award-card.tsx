import Image from "next/image";
import Link from "next/link";

interface AwardCardProps {
	slug: string;
	name: string;
	description: string;
	imageUrl: string;
	detailText: string;
}

export default function AwardCard({ slug, name, description, imageUrl, detailText }: AwardCardProps) {
	const href = `/awards#${slug}`;

	return (
		<div className="group flex flex-col gap-6 transition-transform duration-200 hover:-translate-y-1">
			<Link href={href} scroll={false} className="relative aspect-square rounded-3xl border border-[#FFEA9E] overflow-hidden shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_6px_0_#FAE287] transition-shadow duration-200 group-hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_12px_0_#FAE287] block">
				<Image
					src={imageUrl}
					alt={name}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			</Link>
			<div className="flex flex-col gap-1">
				<Link href={href} scroll={false}>
					<h3 className="font-[family-name:var(--font-montserrat)] text-2xl font-normal text-[#FFEA9E] leading-8 tracking-[0px]">
						{name}
					</h3>
				</Link>
				<p className="font-[family-name:var(--font-montserrat)] text-base font-normal text-white leading-6 tracking-[0.5px] line-clamp-2">
					{description}
				</p>
				<Link
					href={href}
					scroll={false}
					className="inline-flex items-center gap-1 py-4 font-[family-name:var(--font-montserrat)] text-base font-medium text-white leading-6 tracking-[0.15px] hover:underline w-fit"
				>
					{detailText}
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path d="M4.667 11.333L11.333 4.667M11.333 4.667H4.667M11.333 4.667V11.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Link>
			</div>
		</div>
	);
}
