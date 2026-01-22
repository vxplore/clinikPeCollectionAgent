import { apiRequest } from "../../client/ApiAgents";
import type { AddTestPayload, MoreTestsData } from "./tests.types";

export function getOtherTests(id: string, pageSize: number, pageNumber: number, search: string) {
    return apiRequest<MoreTestsData>({
        url: `assignments/${id}/other-tests`,
        method: "get",
        params: {
            pageSize,
            pageNumber,
            search,
        },
    });
}

export function addOtherTest(id: string, payload: AddTestPayload) {
    return apiRequest({
        url: `assignments/${id}/tests`,
        method: "post",
        data: payload,
    });

}

