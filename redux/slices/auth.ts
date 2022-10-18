import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    isLoggedIn: false,
    user: 0,
    accessToken: "",
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = 0;
            state.accessToken = "";
        }
    }
});


const {actions, reducer} = authSlice;
export const {login, logout} = actions;
export default reducer;