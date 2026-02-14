export function UrlCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-slate-200 rounded-lg"></div>
            <div className="h-5 w-16 bg-slate-200 rounded"></div>
          </div>
          <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
          <div className="h-4 w-full bg-slate-200 rounded"></div>
          <div className="h-3 w-32 bg-slate-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-20 bg-slate-200 rounded-lg"></div>
          <div className="h-10 w-20 bg-slate-200 rounded-lg"></div>
          <div className="h-10 w-20 bg-slate-200 rounded-lg"></div>
          <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
      <div className="h-10 w-16 bg-slate-200 rounded"></div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
      <div className="h-[300px] bg-slate-100 rounded-lg flex items-end justify-around p-4 gap-2">
        <div className="w-full bg-slate-200 rounded-t" style={{ height: '60%' }}></div>
        <div className="w-full bg-slate-200 rounded-t" style={{ height: '80%' }}></div>
        <div className="w-full bg-slate-200 rounded-t" style={{ height: '40%' }}></div>
        <div className="w-full bg-slate-200 rounded-t" style={{ height: '90%' }}></div>
        <div className="w-full bg-slate-200 rounded-t" style={{ height: '50%' }}></div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded mb-2"></div>
        <div className="h-5 w-64 bg-slate-200 rounded"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      {/* Charts Skeleton */}
      <div className="mb-8">
        <div className="h-7 w-32 bg-slate-200 rounded mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>

      {/* URL Cards Skeleton */}
      <div className="space-y-4">
        <UrlCardSkeleton />
        <UrlCardSkeleton />
        <UrlCardSkeleton />
      </div>
    </div>
  );
}
