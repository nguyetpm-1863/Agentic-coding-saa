"use client";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function AwardsError({ error, reset }: ErrorProps) {
	return (
		<div className="min-h-screen bg-[#00101A] flex items-center justify-center px-4">
			<div className="flex flex-col items-center gap-6 text-center">
				<h2 className="text-white text-xl font-semibold">
					Something went wrong
				</h2>
				{error.digest && (
					<p className="text-white/50 text-sm">Error ID: {error.digest}</p>
				)}
				<button
					onClick={reset}
					className="rounded-lg bg-[#FFEA9E] px-6 py-3 text-[#00101A] font-bold text-base hover:bg-[#FFE07A] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
