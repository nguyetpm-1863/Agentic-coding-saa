export default function AwardsLoading() {
	return (
		<div className="min-h-screen bg-[#00101A]">
			{/* Header skeleton */}
			<div className="fixed top-0 w-full h-20 bg-[#0B0F12]/80 px-4 md:px-12 lg:px-20 xl:px-36 py-3 flex items-center justify-between z-50">
				<div className="w-[52px] h-[48px] rounded bg-white/10 animate-pulse" />
				<div className="hidden md:flex items-center gap-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="w-24 h-6 rounded bg-white/10 animate-pulse" />
					))}
				</div>
				<div className="w-20 h-10 rounded bg-white/10 animate-pulse" />
			</div>

			{/* Key visual skeleton */}
			<div className="w-full h-[300px] md:h-[400px] xl:h-[547px] bg-white/5 animate-pulse" />

			{/* Content skeleton */}
			<div className="px-4 md:px-12 lg:px-20 xl:px-36 py-8 md:py-16 lg:py-16 xl:py-24 flex flex-col gap-12 md:gap-20 lg:gap-[80px] xl:gap-[120px]">
				{/* Section title skeleton */}
				<div className="flex flex-col gap-4 items-center">
					<div className="w-64 h-8 rounded bg-white/10 animate-pulse" />
					<div className="w-full h-px bg-[#2E3940]" />
					<div className="w-96 h-14 rounded bg-white/10 animate-pulse" />
				</div>

				{/* Award cards skeleton */}
				<div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
					{/* Sidebar skeleton */}
					<div className="hidden lg:flex flex-col gap-4 w-[160px] xl:w-[178px]">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="h-12 rounded bg-white/10 animate-pulse" />
						))}
					</div>

					{/* Cards skeleton */}
					<div className="flex-1 flex flex-col gap-12 xl:gap-20">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="flex flex-col lg:flex-row gap-6 xl:gap-10">
								<div className="w-[280px] xl:w-[336px] h-[280px] xl:h-[336px] rounded-3xl bg-white/10 animate-pulse mx-auto lg:mx-0 shrink-0" />
								<div className="flex-1 flex flex-col gap-6">
									<div className="w-48 h-8 rounded bg-white/10 animate-pulse" />
									<div className="w-full h-20 rounded bg-white/10 animate-pulse" />
									<div className="h-px bg-[#2E3940]" />
									<div className="w-32 h-10 rounded bg-white/10 animate-pulse" />
									<div className="h-px bg-[#2E3940]" />
									<div className="w-40 h-10 rounded bg-white/10 animate-pulse" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Kudos skeleton */}
				<div className="w-full h-[300px] xl:h-[500px] rounded-2xl bg-white/5 animate-pulse" />
			</div>
		</div>
	);
}
