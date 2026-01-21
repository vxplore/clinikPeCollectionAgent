function SampleTabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* SampleStatCard Skeleton */}
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 rounded-lg bg-gray-200 p-4 h-20" />
        ))}
      </div>

      {/* SampleCard Skeletons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded-full" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <div className="h-8 w-20 bg-gray-300 rounded-lg" />
            <div className="h-8 w-20 bg-gray-300 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SampleTabSkeleton;
