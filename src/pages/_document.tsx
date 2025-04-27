import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* PWA primary meta tags */}
                <link rel="manifest" href="/manifest.json" />
                <meta name="application-name" content="Tên App Của Bạn" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Tên App Của Bạn" />
                <meta name="description" content="Mô tả ngắn gọn về app của bạn" />
                <meta name="theme-color" content="#000000" />

                {/* Icons for PWA */}
                <link rel="icon" href="/icons/icon-192x192.png" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <link rel="shortcut icon" href="/icons/icon-512x512.png" />

                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TP8CTGKW');`,
                    }}
                />
                {/* End Google Tag Manager */}

                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-T94X91W4E0"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-T94X91W4E0');`,
                    }}
                />
                {/* End Google Analytics */}
            </Head>
            <body className="antialiased">
            {/* Google Tag Manager (noscript) */}
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TP8CTGKW"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
            />
            {/* End Google Tag Manager (noscript) */}

            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
