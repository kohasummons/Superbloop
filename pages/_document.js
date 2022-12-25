import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Blooper" key="title"/>
        <meta property="og:description" content="Bloop is gonna help you write the sweetest christmas greetings to the ones you love" key="description"/>
        <meta
          property="og:image"
          content="https://github.com/kohasummons/gpt3-writer-starter/blob/main/assets/twitter-og.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
