/**
 * Safely extracts and validates latitude and longitude values
 * Ensures values are finite numbers before returning them
 */
export function getSafeLatLng(location?: {
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
}) {
    const lat = location?.lat ?? location?.latitude;
    const lng = location?.lng ?? location?.longitude;

    if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        Number.isFinite(lat) &&
        Number.isFinite(lng)
    ) {
        return {
            lat,
            lng,
        };
    }

    return null;
}

/**
 * Validates if coordinates are within valid geographic bounds
 */
export function isValidCoordinates(lat?: number, lng?: number): boolean {
    if (typeof lat !== "number" || typeof lng !== "number") {
        return false;
    }

    return (
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
}
