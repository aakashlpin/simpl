// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Rival Corp Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
          <link rel="stylesheet" href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          html, body {
            background: #F7F7F7;
            color: #5e6f6d;
            font-size: 16px;
            font-family: 'Source Sans Pro', sans-serif;
            box-sizing: border-box;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          img {
            box-sizing: content-box;
          }
          p {
            margin-top: 0;
            margin-bottom: 0.5rem;
          }
          .label {
            color: #ccc;
            font-size: 0.85rem;
            margin-bottom: 0;
          }
          .uc {
            text-transform: uppercase;
          }
        `}
        </style>
      </html>
    )
  }
}
