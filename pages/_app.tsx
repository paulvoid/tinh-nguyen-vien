import type { AppProps } from "next/app";
import React, { FC } from "react";
import GlobalStyle from "../components/styles/GlobalStyle";
import "../styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import HeaderLayout from "../components/layout/header";
import { wrapper } from "../redux";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {},
    },
  });

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {},
    },
  });
  return (
    <>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <Provider store={store}>
          <NextUIProvider>
            <HeaderLayout />
            <Component {...props.pageProps} />
          </NextUIProvider>
        </Provider>
      </NextThemesProvider>
    </>
  );
};
export default MyApp;
