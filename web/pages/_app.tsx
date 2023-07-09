import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
})
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <main className={`${roboto.className}`}>
    <Header />
    <Component {...pageProps} />
    <Analytics />
  </main> 
}
