export default function ContentShowcaseLoading() {
  const LoadingCard = () => (
    <div className="min-w-[220px] w-[220px] h-[350px] bg-card/20 rounded-2xl animate-pulse" />
  );

  const LoadingSportsCard = () => (
    <div className="min-w-[280px] w-[280px] h-[160px] bg-card/20 rounded-2xl animate-pulse" />
  );

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-accent/20 rounded animate-pulse" />
            <div className="w-32 h-4 bg-accent/20 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="w-96 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
            <div className="w-64 h-8 bg-foreground/10 rounded animate-pulse mx-auto" />
          </div>
          <div className="w-full max-w-3xl h-6 bg-muted-foreground/10 rounded animate-pulse mx-auto" />
        </div>

        {/* Movies Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg animate-pulse" />
            <div className="w-48 h-8 bg-foreground/10 rounded animate-pulse" />
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* TV Shows Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg animate-pulse" />
            <div className="w-48 h-8 bg-foreground/10 rounded animate-pulse" />
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Sports Leagues Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg animate-pulse" />
            <div className="w-48 h-8 bg-foreground/10 rounded animate-pulse" />
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingSportsCard key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="w-24 h-12 bg-foreground/10 rounded animate-pulse mx-auto" />
                <div className="w-32 h-4 bg-muted-foreground/10 rounded animate-pulse mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
