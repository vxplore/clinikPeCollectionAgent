import { useEffect } from "react";
import { useAuthStore } from "../stores/auth.store";
import { apiRequest } from "../apis/client/ApiAgents";

interface AuthMeResponse {
    status: "authenticated" | "unauthenticated";
}

export function useAuthBootstrap() {
    const setAuth = useAuthStore((s) => s.setAuth);
    const setUnauth = useAuthStore((s) => s.setUnauth);

    useEffect(() => {
        let mounted = true;

        const bootstrapAuth = async () => {
            try {
                const response = await apiRequest<AuthMeResponse>({
                    url: "/me",
                    method: "get",
                });
                console.log("Auth bootstrap response:", response.httpStatus);
                if (mounted && response.httpStatus === 200 && response.data?.status === "authenticated") {
                    // User data will be fetched/loaded separately from another endpoint
                    setAuth({
                        id: "",
                        name: "",
                        profile_image: null,
                    });
                } else if (mounted) {
                    setUnauth();
                }
            } catch {
                // 401 errors are handled by axios interceptor (redirectToLogin)
                // Other errors also result in unauthenticated state
                if (mounted) {
                    setUnauth();
                }
            }
        };

        bootstrapAuth();

        return () => {
            mounted = false;
        };
    }, [setAuth, setUnauth]);
}
