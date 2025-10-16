import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import axios from "axios";
import { clearDeviceId } from "@/utils/device";

interface UserState {
    user_id: string | null;
    fullname: string | null;
    email: string | null;
    permission: string | null;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    date_of_birth: string | null;
    isLoading: boolean;
}

const initialState: UserState = {
    user_id: null,
    fullname: null,
    email: null,
    permission: null,
    is_email_verified: false,
    is_phone_verified: false,
    date_of_birth: null,
    isLoading: false,
};

// Utility functions for token management
export const getAccessTokenFromStorage = (): string | null => {
    if (typeof window === 'undefined') return null;

    // Check localStorage first
    const localStorageToken = localStorage.getItem('access_token');
    if (localStorageToken) return localStorageToken;

    // Check cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'access_token') {
            return decodeURIComponent(value);
        }
    }

    return null;
};

export const setAccessTokenToStorage = (token: string, expiresIn?: number): void => {
    if (typeof window === 'undefined') return;

    // Set to localStorage
    localStorage.setItem('access_token', token);

    // Set to cookie with expiration
    const maxAge = expiresIn || 36288000; // Default 420 days
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
    document.cookie = `access_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict`;
};

export const clearAccessTokenFromStorage = (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('access_token');
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict';
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const accessToken = getAccessTokenFromStorage();

        if (!accessToken) {
            return rejectWithValue("No access token found");
        }

        const { data } = await axios.get(`/api/auth/status`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });

        if (data.authenticated) {
            if (data.renewed && data.access_token) {
                setAccessTokenToStorage(data.access_token, data.expires_in);
            }

            return {
                user_id: data.user?.user_id || null,
                fullname: data.user?.fullname || null,
                email: data.user?.email || null,
                permission: data.user?.permission || "member",
                is_email_verified: data.user?.is_email_verified || false,
                is_phone_verified: data.user?.is_phone_verified || false,
                date_of_birth: data.user?.date_of_birth || null,
            };
        }

        if (data.clearToken) {
            clearAccessTokenFromStorage();
        }

        return rejectWithValue(data.error || "Authentication failed");

    } catch (error) {
        console.log("Auth check failed:", error);

        if (error instanceof Error || (error && typeof error === 'object' && 'response' in error)) {
            const axiosError = error as { response?: { status?: number } };
            if (axiosError.response?.status === 401) {
                clearAccessTokenFromStorage();
            }
        }

        return rejectWithValue("Auth check failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Omit<UserState, 'isLoading'>>) => {
            state.user_id = action.payload.user_id;
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
            state.permission = action.payload.permission;
            state.is_email_verified = action.payload.is_email_verified;
            state.is_phone_verified = action.payload.is_phone_verified;
            state.date_of_birth = action.payload.date_of_birth;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user_id = null;
            state.fullname = null;
            state.email = null;
            state.permission = null;
            state.is_email_verified = false;
            state.is_phone_verified = false;
            state.date_of_birth = null;
            state.isLoading = false;
            clearAccessTokenFromStorage();
            clearDeviceId();
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user_id = action.payload.user_id;
                state.fullname = action.payload.fullname;
                state.email = action.payload.email;
                state.permission = action.payload.permission;
                state.is_email_verified = action.payload.is_email_verified;
                state.is_phone_verified = action.payload.is_phone_verified;
                state.date_of_birth = action.payload.date_of_birth;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user_id = null;
                state.fullname = null;
                state.email = null;
                state.permission = null;
                state.is_email_verified = false;
                state.is_phone_verified = false;
                state.date_of_birth = null;
                state.isLoading = false;
            });
    },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.user_id !== null;

export default authSlice.reducer;
