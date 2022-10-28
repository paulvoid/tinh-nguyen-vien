import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    isLoggedIn: false,
    user: 0,
    accessToken: "",
    role: "",
    userName : "",
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.role = action.payload.role
            state.userName = action.payload.userName
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = 0;
            state.accessToken = "";
            state.role = "";
        },
        setUserInfo: (state, action) => {
            state.user = action.payload.user
            state.role = action.payload.role
        }
    }
});


const {actions, reducer} = authSlice;
export const {login, logout, setUserInfo} = actions;
export default reducer;