export default function KudosLoading() {
  return (
    <div className="min-h-screen bg-[#00101A] max-w-[1512px] mx-auto">
      {/* Header skeleton */}
      <div className="fixed top-0 w-full h-20 bg-[#0B0F12]/80 px-4 md:px-12 lg:px-20 xl:px-36 py-3 flex items-center justify-between z-50">
        <div className="w-[52px] h-[48px] rounded bg-white/10 animate-pulse" />
        <div className="w-[80px] h-[40px] rounded bg-white/10 animate-pulse" />
      </div>

      <div className="pt-20">
        {/* Hero skeleton */}
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-8 px-4 py-12">
          <div className="w-[400px] max-w-full h-12 rounded bg-white/10 animate-pulse" />
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-[920px]">
            <div className="h-14 flex-1 rounded-full bg-white/10 animate-pulse" />
            <div className="h-11 w-full md:w-[300px] rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* Highlight section skeleton */}
        <div className="px-4 py-8 md:px-12 lg:px-20 xl:px-36">
          <div className="w-[250px] h-10 rounded bg-white/10 animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[200px] rounded-xl bg-white/[0.05] border border-white/[0.08] animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Spotlight skeleton */}
        <div className="px-4 py-8 md:px-12 lg:px-20 xl:px-36">
          <div className="w-[250px] h-10 rounded bg-white/10 animate-pulse mx-auto mb-4" />
          <div className="w-[200px] h-14 rounded bg-white/10 animate-pulse mx-auto mb-8" />
          <div className="h-[300px] rounded bg-white/[0.03] animate-pulse" />
        </div>

        {/* Feed skeleton */}
        <div className="px-4 py-8 md:px-12 lg:px-20 xl:px-36">
          <div className="w-[200px] h-10 rounded bg-white/10 animate-pulse mb-6" />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-xl bg-white/[0.05] border border-white/[0.08] animate-pulse"
                />
              ))}
            </div>
            <div className="w-full lg:w-[280px] xl:w-[300px]">
              <div className="h-[400px] rounded-2xl bg-white/[0.05] border border-white/[0.08] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
