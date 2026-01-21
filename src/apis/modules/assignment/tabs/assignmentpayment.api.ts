
import { apiRequest } from "../../../client/ApiAgents";
import type { AssignmentPaymentsData } from "../assignment.types";

export const getAssignmentPayment = (id: string) => {
    return apiRequest<AssignmentPaymentsData>({
        method: "get",
        url: `assignments/${id}/payment`,
    });
}


