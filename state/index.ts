import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import auth from "./slices/auth";
import {saveState, loadState} from "./cookieStorage";
//MIDDLEWARE
const localStorageMiddleware = store => next => action => {
    const result = next(action);
    if (action.type?.includes('auth/')) {
        saveState(store.getState().auth.accessToken);
    }
    return result;
}

export const makeStore = () => {

    return configureStore({
        reducer: {
            auth
        },

        preloadedState: {auth: loadState()},
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
    });
}
export const wrapper = createWrapper(makeStore);
