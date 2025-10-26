"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        // Check auth on initial load
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        // Check auth when navigating between pages
        const handleRouteChange = () => {
            dispatch(checkAuth());
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [dispatch, router.events]);

    return <>{children}</>;
};

export default AuthProvider;
