import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "../../../apis/client/ApiError";
import type { ApiSuccess } from "../../../apis/client/ApiAgents.types";
import type { MaskingNumberResponse, StatisticsResponse } from "../../../apis/modules/dashboard/dashboard.types";
import { getMaskingNumber, getStatistics } from "../../../apis/modules/dashboard/dashboard.api";

export function useStatistics() {
  // explicitly type the query so consumers get proper IntelliSense
  const query = useQuery<
    ApiSuccess<StatisticsResponse>,
    ApiError
  >({
    queryKey: ["statistics"],
    queryFn: getStatistics,

    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // pull out the pieces we care about and give them explicit types
  const stats = query.data?.data.statistics ?? null;
  const notificationCount =
    query.data?.data.statistics.notification_count ?? 0;


  return {
    statistics: stats,
    notificationCount,
    isLoading: query.isLoading,
    error: query.error as ApiError | null,
  };
}

export function useMaskingNumber(bookingId: string) {
  const query = useQuery<ApiSuccess<MaskingNumberResponse>, ApiError>({
    queryKey: ["maskingNumber", bookingId],
    queryFn: () => getMaskingNumber(bookingId),
    enabled: !!bookingId,
    retry: false,
  });
  return {
    maskingNumber: query?.data?.data?.virtual_number ?? null,
    isLoading: query.isLoading,
    error: query.error as ApiError | null,
  };
}