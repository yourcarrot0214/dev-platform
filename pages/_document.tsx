import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props: JSX.IntrinsicAttributes) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans:ital,wght@0,400;0,700;0,900;1,900&family=Poppins:ital,wght@0,900;1,900&display=swap"
            rel="stylesheet"
          />
          {/* MUI use to Roboto font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* MUI Font icons */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          {/* React devtools */}
          {/* <script src="http://localhost:8097"></script> */}
          <link rel="shortcut icon" href="/static/image/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/image/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/image/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/image/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/image/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/image/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/image/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/image/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/image/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/image/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/image/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/image/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/image/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/image/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/image/favicon/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/image/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <title>DEV Platform 🥕</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
