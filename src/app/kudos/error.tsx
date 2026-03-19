"use client";

export default function KudosError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#00101A] flex flex-col items-center justify-center px-4">
      <h2 className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white mb-4 text-center">
        Something went wrong
      </h2>
      <p className="font-[family-name:var(--font-montserrat)] text-base text-white/60 mb-8 text-center">
        An error occurred while loading the Kudos Live Board.
      </p>
      <button
        type="button"
        onClick={reset}
        className="h-12 px-8 rounded-lg bg-[#FFEA9E] text-[#00101A] font-[family-name:var(--font-montserrat)] text-base font-bold cursor-pointer transition-colors duration-150 hover:bg-[#FFE580] active:bg-[#FFD84D] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
