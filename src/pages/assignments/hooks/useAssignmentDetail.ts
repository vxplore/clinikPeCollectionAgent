import { useQuery } from "@tanstack/react-query";
import type { AssignmentDetailData } from "../../../apis/modules/assignment/assignment.types";
import { getAssignmentDetails } from "../../../apis/modules/assignment/assignmentdetails.api";





export function useAssignmentDetail(id?: string) {
    return useQuery<AssignmentDetailData>({
        queryKey: ["assignment", id],
        queryFn: async () => {
            const response = await getAssignmentDetails(id!);
            return response.data;
        },
        enabled: !!id,
    });
}
