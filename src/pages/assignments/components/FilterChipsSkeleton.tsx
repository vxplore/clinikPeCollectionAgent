export default function FilterChipsSkeleton() {
  return (
    <div className="px-2 pt-0 pb-0">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 scrollbar-hide">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm bg-[#F3F4F6] animate-pulse"
            style={{ width: "80px", height: "36px" }}
          />
        ))}
      </div>
    </div>
  );
}
