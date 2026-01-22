import type { AddTestPayload } from "../../../apis/modules/tests/tests.types";

interface CartItemForPayload {
    uid: string;
    type: string;
    sub_type: string; // Allow other propertiess
}

/**
 * Builds a payload for adding tests to an assignment
 * Extracts uid, type, and sub_type from cart items
 * Maps uid to item_id in the payload structure
 */
export const buildAddTestPayload = (
    cartItems: CartItemForPayload[]
): AddTestPayload => {
    return {
        items: cartItems.map((item) => ({
            item_id: item.uid,
            type: item.type,
            sub_type: item.sub_type,
        })),
    };
};
