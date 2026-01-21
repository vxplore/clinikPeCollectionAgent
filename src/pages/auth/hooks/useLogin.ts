import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../apis/modules/auth/auth.api";
// import type { LoginPayload } from "../../../apis/modules/auth/auth.types";
import type { ApiError } from "../../../apis/client/ApiError";
import { notify } from "../../../app/notifications";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth.store";

export function useLogin() {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            notify.success(data.message ?? "Login successful");
            useAuthStore.getState().setUser({
                id: data.data.user_id,
                name: "",
                profile_image: data.data.profile_image,
            });
            navigate("/dashboard", { replace: true });
        },
        onError: (error: ApiError) => {
            notify.error(error.message);
        },

    });


    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
    };
}
