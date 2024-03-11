import * as React from "react";
import Head from "next/head";
type Props = {
  title?: string;
  keyWords?: string;
  description?: string;
};

const HtmlHead: React.FunctionComponent<Props> = ({
  title,
  keyWords,
  description,
}) => (
  <Head>
    <title>{title}</title>
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    {/* <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> */}
    <meta name="keywords" content={keyWords} />
    <meta name="description" content={description} />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  </Head>
);

export default HtmlHead;
