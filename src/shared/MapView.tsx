// import React from "react";
import LocationMapView from "../shared/LocationMapView/LocationMapView";
import { useLocation } from "react-router-dom";
import { getSafeLatLng } from "./helpers/mapHelpers";

const MapView = () => {
  const location = useLocation();
  const position = getSafeLatLng(location.state?.location);

  if (!position) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Invalid location coordinates</p>
      </div>
    );
  }

  return (
    <div>
      <LocationMapView lat={position.lat} lng={position.lng} />
    </div>
  );
};

export default MapView;
