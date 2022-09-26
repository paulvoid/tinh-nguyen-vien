import React from "react";
import type { FC } from "react";
import Head from "next/head";
import MyNav from "./MyNav";
interface Props {
    children: React.ReactNode;

}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
        <Head>
            <title>Next.js</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
            <header>
                <MyNav />
            </header>
        <main>
            {children}
        </main>
        </>
    );
}

export default Layout;