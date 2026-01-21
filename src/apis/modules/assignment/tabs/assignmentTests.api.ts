import { apiRequest } from "../../../client/ApiAgents";
import type { AssignmentTestsData } from "../assignment.types";


export function getAssignmentTest(id: string, pageNumber: number, pageSize: number) {
    return apiRequest<AssignmentTestsData>({
        method: "get",
        url: `assignments/${id}/tests`,
        params: {
            pageNumber,
            pageSize,
        },
    });
}
