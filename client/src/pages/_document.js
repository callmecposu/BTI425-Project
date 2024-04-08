import { Html, Head, Main, NextScript } from "next/document";
import Layout from "@/components/layout";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white min-h-full">
        <Layout />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
