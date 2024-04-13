import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="/css/main.css" />
      </Head>
      <body className="bg-white min-h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
