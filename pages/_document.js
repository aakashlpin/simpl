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
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
          <link rel="stylesheet" href='https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          html, body {
            background: #F7F7F7;
            color: #5e6f6d;
            font-size: 16px;
            font-family: 'Source Sans Pro', sans-serif;
          }
        `}
        </style>
      </html>
    )
  }
}
