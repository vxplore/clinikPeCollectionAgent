import { useMutation } from "@tanstack/react-query";
import { addOtherTest } from "../../../apis/modules/tests/tests.api";
import type { AddTestPayload } from "../../../apis/modules/tests/tests.types";

export function useAssignmentPaymentAddition(id: string) {
    return useMutation({
        mutationFn: (payload: AddTestPayload) =>
            addOtherTest(id, payload),
        retry: false,
    });
}


// export function useAssignmentPaymentAddition(id: string) {
//   return useMutation({
//     mutationFn: (payload: AssignmentPaymentPayload) =>
//       addAssignmentPayment(payload, id),
//     retry: false,
//   });
// }
