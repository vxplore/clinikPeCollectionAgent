function TestCardSkeleton() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 w-48 bg-gray-300 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-gray-300 rounded-full" />
          <div className="h-8 w-8 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Description box */}
      <div className="mt-3 rounded-lg bg-gray-100 px-4 py-3 space-y-2">
        <div className="h-3 w-full bg-gray-300 rounded" />
        <div className="h-3 w-5/6 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default TestCardSkeleton;
