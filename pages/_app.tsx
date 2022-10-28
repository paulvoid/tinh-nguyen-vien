import type {AppProps} from "next/app";
import React, {FC} from "react";
import HeaderLayout from "../components/layout/header";

import {wrapper} from "../state";
import {Provider} from "react-redux";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "../styles/theme";
import UserService from "../services/user.service";
import {setUserInfo} from "../state/slices/auth";

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);


    return (
        <>

            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <HeaderLayout/>
                    <Component {...props.pageProps} />
                </ChakraProvider>

            </Provider>

        </>
    );
};


export default MyApp;
