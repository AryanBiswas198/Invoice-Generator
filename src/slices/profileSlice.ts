import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    user: any; // Update the type as per your user data structure
    loading: boolean;
}

const initialState: ProfileState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
