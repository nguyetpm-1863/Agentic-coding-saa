interface CountdownUnitProps {
	value: number;
	label: string;
}

export default function CountdownUnit({ value, label }: CountdownUnitProps) {
	const digits = String(value).padStart(2, "0").split("");

	return (
		<div className="flex flex-col items-center gap-3 md:gap-4 xl:gap-[21px] w-auto xl:w-[175px]">
			<div className="flex gap-3 md:gap-4 xl:gap-[21px]">
				{digits.map((digit, index) => (
					<div
						key={index}
						className="relative flex items-center justify-center w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[68px] lg:h-[110px] xl:w-[77px] xl:h-[123px] rounded-lg xl:rounded-[12px] border-[0.75px] border-[#FFEA9E] backdrop-blur-[24.96px]"
						style={{
							background:
								"linear-gradient(180deg, rgba(255, 234, 158, 0.12) 0%, rgba(255, 234, 158, 0.04) 100%)",
						}}
					>
						<div className="absolute inset-0 bg-gradient-to-b from-white to-white/10 opacity-50 rounded-[inherit]" />
						<span
							className="relative text-white font-normal text-[46px] md:text-[58px] lg:text-[66px] xl:text-[73.73px]"
							style={{
								fontFamily: "var(--font-digital-numbers), monospace",
								lineHeight: 1,
							}}
						>
							{digit}
						</span>
					</div>
				))}
			</div>
			<span className="font-montserrat text-base md:text-2xl xl:text-4xl font-bold text-white text-center">
				{label}
			</span>
		</div>
	);
}
