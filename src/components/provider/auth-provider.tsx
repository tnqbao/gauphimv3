"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";
import { getDeviceId } from "@/utils/deviceId";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Initialize device ID
        getDeviceId();

        // Restore user data from localStorage first
        dispatch(restoreUser());

        // Tạm thời disable check auth với server
        // const { checkAuth } = require("@/store/slices/authSlice");
        // dispatch(checkAuth());
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider;
