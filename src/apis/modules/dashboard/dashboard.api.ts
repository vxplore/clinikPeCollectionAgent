import { apiRequest } from "../../client/ApiAgents";
import { type MaskingNumberResponse, type StatisticsResponse } from "./dashboard.types";



export function getStatistics() {
    return apiRequest<StatisticsResponse>({
        url: "assignments/statistics",
        method: "get",
        data: {},
    });
}


// 1. collection agent call to patient
// {{clinicPeBaseUrl}}api/v1/collection-agents/call/initiate
// method: post 
// req body:
// {
//     "booking_id":"QmHxCp4X"
// }
// response:
// {
//     "success": true,
//     "httpStatus": 200,
//     "message": "Call session created",
//     "data": {
//         "virtual_number": "08047495233"
//     }
// }
export function getMaskingNumber(bookingId: string) {
    return apiRequest<MaskingNumberResponse>({
        url: `call/initiate`,
        method: "post",
        data: {
            booking_id: bookingId
        },
    });
}
