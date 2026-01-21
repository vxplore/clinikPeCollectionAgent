import ExpandableDetails from "./components/ExpandableDetails";
import AssignmentTabs from "./components/AssignmentTabs";
import { useAssignmentDetail } from "./hooks/useAssignmentDetail";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSafeLatLng } from "../../shared/helpers/mapHelpers";

const AssignmentPageDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useAssignmentDetail(id);
  console.log("Assignment Detail Data:", data);

  const navigate = useNavigate();

  const handleLocationClick = ({
    lat,
    lng,
    address,
  }: {
    lat?: number;
    lng?: number;
    address?: string;
  }) => {
    // Validate coordinates before navigation
    const position = getSafeLatLng({ lat, lng });

    if (!position) {
      console.warn("Invalid location coordinates");
      return;
    }

    navigate("/map-view", {
      state: {
        location: {
          lat: position.lat,
          lng: position.lng,
          address,
        },
      },
    });
  };

  return (
    <div className="space-y-0 bg-white pb-0">
      <ExpandableDetails
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error ? error.message : null}
        title="Details"
        defaultOpen={false}
        onLocationClick={handleLocationClick}
      />
      <AssignmentTabs />
    </div>
  );
};

export default AssignmentPageDetails;
