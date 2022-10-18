import type { AppProps } from "next/app";
import React, { FC } from "react";
import GlobalStyle from "../components/styles/GlobalStyle";
import { NextUIProvider } from "@nextui-org/react";
import HeaderLayout from "../components/layout/header";
import { wrapper } from "../redux";
import { Provider } from "react-redux";
const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <GlobalStyle />
      <NextUIProvider>
        <HeaderLayout></HeaderLayout>
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </NextUIProvider>
    </>
  );
};
export default MyApp;
