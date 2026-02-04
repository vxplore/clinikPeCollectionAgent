import emptyimg from "../../assets/emptystate.gif";

type EmptyStateProps = {
  title?: string;
  description?: string;
  compact?: boolean;
};

const EmptyState = ({
  title = "No data available",
  description,
  compact = false,
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 ${
        compact ? "py-6" : "min-h-[80vh]"
      }`}
    >
      <img
        src={emptyimg}
        alt="No Data"
        className={compact ? "w-50" : "w-full h-[80vh] object-contain"}
      />

      <h3 className="mt-4 text-base font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;



//  use it this way 
// {items.length === 0 && (
//   <EmptyState
//     title="No assignments yet"
//     description="They will appear here once added"
//     compact
//   />
// )}
