import { useNavigate } from "react-router-dom";
import Badge from "../../../shared/ui/Badge";
import map from "../../../assets/map.svg";
import { AssignmentPageCardSkeleton } from "./AssignmentPageCardSkeleton";
import { getSafeLatLng } from "../../../shared/helpers/mapHelpers";

interface AssignmentPageCardProps {
  loading?: boolean;
  error?: Error | null;
  id: string;
  gender?: string | null;
  name: string;
  age: number | null;
  address: string;
  latitude: number;
  longitude: number;
  collectedCount: number;
  totalCount: number;
  testsCount: number;
  samples: string[];
}

export function AssignmentPageCard({
  loading,
  id,
  name,
  age,
  gender,
  address,
  latitude,
  longitude,
  collectedCount,
  totalCount,
  testsCount,
  samples,
}: AssignmentPageCardProps) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/assignments/${id}`);
  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Validate coordinates before navigation
    const position = getSafeLatLng({ lat: latitude, lng: longitude });

    if (!position) {
      console.warn("Invalid location coordinates");
      return;
    }

    navigate(`/map-view`, {
      state: {
        location: {
          lat: position.lat,
          lng: position.lng,
        },
      },
    });
  };

  if (loading) {
    return <AssignmentPageCardSkeleton />;
  }

  return (
    <div
      className="w-full rounded-xl bg-white border shadow-sm border-gray-200 p-4 cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-semibold text-gray-900">{name}</p>
          <div className="flex gap-1">
            <p className="text-sm  text-gray-500">{age} years</p>-
            <p className="text-sm text-gray-500">{gender}</p>
          </div>
        </div>

        <Badge color="green" size="xs">
          {collectedCount} of {totalCount} collected
        </Badge>
      </div>

      {/* Address */}
      <div className="mt-3 flex items-start gap-2">
        <img src={map} alt="Map" className="mt-0.5" />

        <div className="flex-1">
          <p className="text-sm text-gray-700">{address}</p>
          {/* <p className="text-xs text-gray-400">
            {latitude}, {longitude}
          </p> */}
        </div>

        <button onClick={handleMapClick} className="rounded-lg bg-blue-50 p-4">
          <img src={map} alt="Map" className="h-4 w-4" />
        </button>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-gray-100" />

      {/* Bottom Row */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-500">Tests</p>
          <p className="text-sm font-semibold text-gray-900">
            {testsCount} Tests
          </p>
        </div>

        <div className="text-left">
          <p className="text-xs text-gray-500">Samples</p>
          <p className="text-sm font-semibold text-gray-900">
            {samples.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
