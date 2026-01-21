import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "../../../apis/client/ApiError";
import { getAssignmentSample } from "../../../apis/modules/assignment/tabs/assignmentsample.api";
import { getAssignmentTest } from "../../../apis/modules/assignment/tabs/assignmenttests.api";

export function useAssignmentSample(id: string) {
    const query = useQuery({
        queryKey: ["assignments-sample", id],
        queryFn: () => getAssignmentSample(id),


        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
    console.log("Assignments query data:", query.data);
    return {
        samples: query.data?.data,
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}

export function useAssignmentTests(id: string, pageNumber: number, pageSize: number, enabled: boolean = true) {
    const query = useQuery({
        queryKey: ["assignments-tests", id, pageNumber, pageSize],
        queryFn: () => getAssignmentTest(id, pageNumber, pageSize),

        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!id && enabled,
    });
    console.log("Assignments query data:", query.data);
    return {
        tests: query.data?.data.tests,
        pagination: query.data?.data.pagination,
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}
