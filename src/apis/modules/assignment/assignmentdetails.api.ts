import { apiRequest } from "../../client/ApiAgents";
import type { AssignmentDetailData } from "./assignment.types";



export function getAssignmentDetails(id: string) {
    return apiRequest<AssignmentDetailData>({
        url: `assignments/${id}`,
        method: "get",
    });
}
