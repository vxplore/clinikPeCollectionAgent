import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "../../../apis/client/ApiError";
import { getAssignments, type AssignmentFilters } from "../../../apis/modules/assignment/assignment.api";

export function useAssignments(filters?: AssignmentFilters) {
    const query = useQuery({
        queryKey: ["assignments", filters],
        queryFn: () => getAssignments(filters),
        

        retry: false,
        staleTime: 5 * 60 * 1000,
    });
    console.log("Assignments query data:", query.data);
    return {
        assignments: query.data?.data.assignments ?? [],
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}
