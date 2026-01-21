import { apiRequest } from "../../client/ApiAgents";
import type { AssignmentFilter } from "./assignment.types";

//eta filters  types

export function getAssignmentsFilters() {
    return apiRequest<AssignmentFilter>({
        url: "assignments/filters",
        method: "get",
    });
}
