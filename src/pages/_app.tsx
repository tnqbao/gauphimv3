import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "@/components/content/theme-provider";
import {store} from "@/store";
import {Provider} from "react-redux";

export default function App({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Provider store={store}>
            <Component {...pageProps} />
            </Provider>
        </ThemeProvider>);
}
