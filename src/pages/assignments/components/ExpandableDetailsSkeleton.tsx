function ExpandableDetailsSkeleton() {
  return (
    <div className="bg-white p-1.5 rounded-lg animate-pulse">
      <div className="w-full flex items-center justify-between px-4 py-0">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="p-1 rounded-full bg-gray-100 h-8 w-8" />
      </div>
    </div>
  );
}

export default ExpandableDetailsSkeleton;
