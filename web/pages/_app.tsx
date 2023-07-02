import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <main className={roboto.className}>
    <Component {...pageProps} />
  </main> 
}
