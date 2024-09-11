import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isUserLogin: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state,action) => {
            state.isUserLogin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isUserLogin = false;
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

