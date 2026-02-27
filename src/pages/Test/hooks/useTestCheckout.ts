import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAssignmentPaymentAddition } from "./useAddOtherTest";
import { buildAddTestPayload } from "../utils/payloadbuilder";
import { notify } from "../../../app/notifications";

interface CartItem {
    uid: string;
    display_name: string;
    price: string;
    mrp: number;
    slug: string;
    type: string;
    sub_type: string;
    discount_available: boolean;
    discount_percentage: string;
    home_collection_possible: "0" | "1";
    home_collection_fee: string | null;
    is_exist_in_booking: boolean;
    description?: string;
}

interface UseTestCheckoutProps {
    id: string;
    cart: CartItem[];
    onShowSuccess: (show: boolean) => void;
}

export function useTestCheckout({
    id,
    cart,
    onShowSuccess,
}: UseTestCheckoutProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: addTests, isPending } = useAssignmentPaymentAddition(id);

    const handleCheckout = useCallback(() => {
        if (cart.length === 0) {
            console.log("Cart is empty");
            return;
        }

        const payload = buildAddTestPayload(cart);
        console.log("Proceeding to checkout with payload:", payload);

        addTests(payload, {
            onSuccess: (response) => {
                console.log("Tests added successfully:", response);

                // Invalidate all assignment tab queries to refresh data
                queryClient.invalidateQueries({
                    queryKey: ["assignments-tests", id],
                });
                queryClient.invalidateQueries({
                    queryKey: ["assignments-sample", id],
                });
                queryClient.invalidateQueries({
                    queryKey: ["assignments-payments", id],
                });
                queryClient.invalidateQueries({
                    queryKey: ["assignments-activities", id],
                });

                onShowSuccess(true);

                // Navigate after 3 seconds to allow success animation to complete
                setTimeout(() => {
                    navigate(`/assignments/${id}`);
                }, 3000);
            },
            onError: (error) => {
                notify.error(
                    error?.message || "Failed to add tests to the assignment.",
                );
                console.error("Error adding tests:", error);
            },
        });
    }, [cart, id, addTests, navigate, onShowSuccess, queryClient]);

    return {
        handleCheckout,
        isCheckoutPending: isPending,
    };
}
