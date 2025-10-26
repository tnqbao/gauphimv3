import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ThemeProvider} from "@/components/provider/theme-provider";
import {store} from "@/store";
import {Provider} from "react-redux";
import AuthProvider from "@/components/provider/auth-provider";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({Component, pageProps}: AppProps) {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={googleClientId || ''}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <Provider store={store}>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                </Provider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}
