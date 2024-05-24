import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import '../styles/bootstrap-icons.min.css';
import { Providers } from '@/providers/providers';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Providers>
    <Component {...pageProps} />
  </Providers>
}