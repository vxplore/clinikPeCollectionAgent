import { deleteTest } from "../../../apis/modules/tests/tests.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSamples } from "../../../apis/modules/samples/samples.api";

export function useDeleteTest(assignmentId: string) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (testUid: string) => deleteTest(assignmentId, testUid),
        onSuccess: () => {
            // Invalidate all related query keys for this assignment
            queryClient.invalidateQueries({
                queryKey: ["assignment", assignmentId, "tests"],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-tests", assignmentId],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-sample", assignmentId],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-payments", assignmentId],
            });
            queryClient.invalidateQueries({
                queryKey: ["assignments-activities", assignmentId],
            });
        },
    });

    return {
        isLoading: mutation.isPending,
        error: mutation.error as Error | null,
        deleteTest: mutation.mutate,
    };
}


export function useDeleteSamples(assignmentId: string, sampleId: string) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => DeleteSamples(assignmentId, sampleId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assignments-sample", assignmentId],
            });
        },
    });

    return {
        isLoading: mutation.isPending,
        error: mutation.error as Error | null,
        deleteSamples: mutation.mutate,
    };
}
