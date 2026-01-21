import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "../../../apis/client/ApiError";
import { getAssignmentsFilters } from "../../../apis/modules/assignment/assignmentFilters.api";

export function useAssignmentFilters() {
    const query = useQuery({
        queryKey: ["assignments-Filters"],
        queryFn: () => getAssignmentsFilters(),


        retry: false,
        staleTime: 5 * 60 * 1000,
    });
    console.log("Assignments query data:", query.data);
    return {
        filters: query.data?.data.filters ?? [],
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}
