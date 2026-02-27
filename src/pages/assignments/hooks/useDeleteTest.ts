import { deleteTest } from "../../../apis/modules/tests/tests.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteSamples } from "../../../apis/modules/samples/samples.api";

export function useDeleteTest(assignmentId: string) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (testUid: string) => deleteTest(assignmentId, testUid),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assignment", assignmentId, "tests"],
            });
        },
    });


    return {
        isLoading: mutation.isPending,
        error: mutation.error as Error | null,
        deleteTest: mutation.mutate,
    }

}


export function useDeleteSamples(assignmentId: string) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (sample: string) => DeleteSamples(assignmentId, sample),
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
    }

}
