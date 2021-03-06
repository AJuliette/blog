/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import GoogleFonts from 'next-google-fonts';

import ThemeContext, { ThemeContextProvider } from '../contexts/ThemeContext';
import '../styles/GlobalStyle.scss';
import '../styles/Code.scss';
import { PreferencesProvider } from '../contexts/PreferencesContext';

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.querySelector('html').className = isDark ? 'dark' : 'light';
  }, [isDark]);
  return (
    <div className={`${isDark ? 'theme--dark' : 'theme--light'}`}>
      <Component {...pageProps} />
    </div>
  );
};

function MyApp(appProps: AppProps) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeContextProvider>
        <PreferencesProvider>
          <WrappedApp {...appProps} />
        </PreferencesProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
