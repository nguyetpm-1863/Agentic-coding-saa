"use client";

export default function LoginError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="min-h-screen bg-[#00101A] flex flex-col items-center justify-center gap-6">
			<p className="font-[family-name:var(--font-montserrat)] text-xl font-bold text-white">
				Something went wrong
			</p>
			<button
				onClick={reset}
				className="bg-[#FFEA9E] text-[#00101A] font-[family-name:var(--font-montserrat)] text-lg font-bold rounded-lg px-6 py-4 cursor-pointer hover:bg-[#FFE07A] transition-colors duration-150"
			>
				Try again
			</button>
		</div>
	);
}
