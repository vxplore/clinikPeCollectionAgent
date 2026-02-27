import { apiRequest } from "../../client/ApiAgents";


export async function DeleteSamples(assignment_id: string , sample : string) {
    return apiRequest({
        method: "delete",
        url: `assignments/${assignment_id}/samples`,
        data: {sample}
    });

}