import type {AppProps} from 'next/app'
import GlobalStyle from "../components/style/GlobalStyle";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalStyle/>
            <Component {...pageProps} />

        </>


    )
}

export default MyApp
