import emptyimg from "../../assets/emptystate.gif";

type EmptyStateProps = {
  title?: string;
  description?: string;
  /**
   * Size in percent (0-100) used for the image height when not compact.
   * Corresponds to viewport height (e.g. 80 means 80vh).  
   * If omitted, defaults to 80.  
   * Use `compact` boolean for small tab usage instead.
   */
  imageSizePercent?: number;
  /**
   * When true renders compact version (smaller padding & image).  
   * Takes precedence over imageSizePercent.
   */
  compact?: boolean;
};

const EmptyState = ({
  title = "No data available",
  description,
  imageSizePercent = 80,
  compact = false,
}: EmptyStateProps) => {
  const isCompact = compact;
  const imageHeight = isCompact ? undefined : `${Math.max(0, Math.min(100, imageSizePercent))}vh`;
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-4 ${
        isCompact ? "py-6" : "min-h-[40vh]"
      }`}
    >
      <img
        src={emptyimg}
        alt="No Data"
        style={
          isCompact
            ? {}
            : { width: "100%", height: imageHeight }
        }
        className={isCompact ? "w-50" : "object-contain"}
      />
      <h2 className="mt-4 text-lg font-medium text-gray-900">{title}</h2>
      {/* {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )} */}
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
//
// or specify custom height for image (0-100):
// <EmptyState imageSizePercent={60} />
