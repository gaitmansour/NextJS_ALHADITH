import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        const {locale} = this.props.__NEXT_DATA__
        const dir = locale === 'ar' ? 'rtl' : 'ltr';
        return (
            <Html>
                <Head>
                </Head>
                <body dir={dir} lang={locale}>
                <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
