import type { AppProps } from 'next/app';

import '../styles/globals.css'; // Ensure this points to your global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
