import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import axios from "axios";
import { removeDeviceId } from "@/utils/deviceId";

interface UserState {
    user_id: string | null;
    fullname: string | null;
    email: string | null;
    permission: string | null;
    isInitialized: boolean;
}

const saveUserToStorage = (user: Omit<UserState, 'isInitialized'>) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(user));
    }
};

const loadUserFromStorage = (): Omit<UserState, 'isInitialized'> => {
    if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user_data');
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                localStorage.removeItem('user_data');
            }
        }
    }
    return {
        user_id: null,
        fullname: null,
        email: null,
        permission: null,
    };
};

const clearUserFromStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
    }
};

// Load initial state from localStorage but mark as not initialized
const initialState: UserState = {
    ...loadUserFromStorage(),
    isInitialized: false,
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/auth/status`, { withCredentials: true });

        if (data.authenticated && data.user && typeof data.user === "object") {
            const { user_id, fullname, email, permission } = data.user;
            if (user_id && fullname && permission) {
                const userData = { user_id, fullname, email: email || null, permission };
                saveUserToStorage(userData);
                return userData;
            }
        }

        return rejectWithValue("Invalid user data");
    } catch {
        return rejectWithValue("Auth check failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Omit<UserState, 'isInitialized'>>) => {
            state.user_id = action.payload.user_id;
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
            state.permission = action.payload.permission;
            state.isInitialized = true;
            saveUserToStorage(action.payload);
        },
        logout: (state) => {
            state.user_id = null;
            state.fullname = null;
            state.email = null;
            state.permission = null;
            state.isInitialized = true;
            removeDeviceId();
            clearUserFromStorage();
        },
        restoreUser: (state) => {
            const savedUser = loadUserFromStorage();
            state.user_id = savedUser.user_id;
            state.fullname = savedUser.fullname;
            state.email = savedUser.email;
            state.permission = savedUser.permission;
            state.isInitialized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<Omit<UserState, 'isInitialized'>>) => {
                state.user_id = action.payload.user_id;
                state.fullname = action.payload.fullname;
                state.email = action.payload.email;
                state.permission = action.payload.permission;
                state.isInitialized = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user_id = null;
                state.fullname = null;
                state.email = null;
                state.permission = null;
                state.isInitialized = true;
                clearUserFromStorage();
            });
    },
});

export const { loginSuccess, logout, restoreUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
