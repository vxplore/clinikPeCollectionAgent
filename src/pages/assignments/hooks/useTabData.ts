import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "../../../apis/client/ApiError";
import { getAssignmentSample, markSampleAsCollected } from "../../../apis/modules/assignment/tabs/assignmentsample.api";
import { getAssignmentTest } from "../../../apis/modules/assignment/tabs/assignmentTests.api";
import { getAssignmentPayment } from "../../../apis/modules/assignment/tabs/assignmentpayment.api";
import { getAssignmentActivities } from "../../../apis/modules/assignment/tabs/assignmentactivity.api";

export function useAssignmentSample(id: string) {
    const query = useQuery({
        queryKey: ["assignments-sample", id],
        queryFn: () => getAssignmentSample(id),

        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
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
    return {
        tests: query.data?.data.tests,
        pagination: query.data?.data.pagination,
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}



export function useAssignmentPayments(id: string, enabled: boolean = true) {
    const query = useQuery({
        queryKey: ["assignments-payments", id],
        queryFn: () => getAssignmentPayment(id),
        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!id && enabled,
    });
    return {
        payments: query.data?.data,
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}


export function useAssignmentActivities(id: string, enabled: boolean = true) {
    const query = useQuery({
        queryKey: ["assignments-activities", id],
        queryFn: () => getAssignmentActivities(id),
        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: !!id && enabled,
    });
    return {
        activities: query.data?.data.activities,
        isLoading: query.isLoading,
        error: query.error as ApiError | null,
    };
}


export function useMarkSampleCollected(
    booking_id: string,
    sample: string,
    assignment_id: string,
    id: string
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["mark-sample-collected", booking_id, sample, assignment_id],
        mutationFn: () =>
            markSampleAsCollected(booking_id, sample, assignment_id),

        onSuccess: () => {
            // Invalidate all related queries
            queryClient.invalidateQueries({
                queryKey: ["statistics"],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments"],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-sample", id],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-tests", id],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-payments", id],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-activities", id],
            });
        },
    });
}