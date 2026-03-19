export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#00101A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#FFEA9E]/20 border-t-[#FFEA9E] animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
