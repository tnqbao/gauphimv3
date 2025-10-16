import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import axios from "axios";
import { clearDeviceId } from "@/utils/device";

interface UserState {
    user_id: number | null;
    fullname: string | null;
    permission: string | null;
    isLoading: boolean;
}

const initialState: UserState = {
    user_id: null,
    fullname: null,
    permission: null,
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

    // Clear from localStorage
    localStorage.removeItem('access_token');

    // Clear from cookies
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict';
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const accessToken = getAccessTokenFromStorage();

        // If no access token, user is not authenticated - no need to call API
        if (!accessToken) {
            return rejectWithValue("No access token found");
        }

        // Call the status API with the token in header
        const { data } = await axios.get(`/api/auth/status`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        });

        if (data.authenticated) {
            // If token was renewed, update it in storage
            if (data.renewed && data.access_token) {
                setAccessTokenToStorage(data.access_token, data.expires_in);
            }


            return {
                user_id: 1, // Replace with actual user data
                fullname: "User", // Replace with actual user data
                permission: "user"
            };
        }

        // If authentication failed or token needs to be cleared
        if (data.clearToken) {
            clearAccessTokenFromStorage();
        }

        return rejectWithValue(data.error || "Authentication failed");

    } catch (error) {
        console.log("Auth check failed:", error);

        // If it's a 401 or token-related error, clear the token
        if (error instanceof Error || (error && typeof error === 'object' && 'response' in error)) {
            const axiosError = error as { response?: { status?: number } };
            if (axiosError.response?.status === 401) {
                clearAccessTokenFromStorage();
            }
        }

        return rejectWithValue("Auth check failed");
    }
});

export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async ({ token, expiresIn, userInfo }: {
        token: string;
        expiresIn?: number;
        userInfo?: Partial<UserState>
    }, { dispatch }) => {
        // Store the token
        setAccessTokenToStorage(token, expiresIn);

        if (userInfo) {
            return userInfo;
        } else {
            // Trigger auth check to get user info
            dispatch(checkAuth());
            return null;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Omit<UserState, 'isLoading'>>) => {
            state.user_id = action.payload.user_id;
            state.fullname = action.payload.fullname;
            state.permission = action.payload.permission;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user_id = null;
            state.fullname = null;
            state.permission = null;
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
                state.permission = action.payload.permission;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user_id = null;
                state.fullname = null;
                state.permission = null;
                state.isLoading = false;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user_id = action.payload.user_id || null;
                    state.fullname = action.payload.fullname || null;
                    state.permission = action.payload.permission || null;
                    state.isLoading = false;
                }
            });
    },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.user_id !== null;

export default authSlice.reducer;
