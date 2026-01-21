import { apiRequest } from "../../../client/ApiAgents";
import type { AssignmentSamplesData } from "../assignment.types";


export function getAssignmentSample(id: string) {
    return apiRequest<AssignmentSamplesData>({
        method: "get",
        url: `assignments/${id}/samples`,
    });
}
