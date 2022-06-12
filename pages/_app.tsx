import '../styles/globals.css'
import '../node_modules/highlight.js/scss/github.scss';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
