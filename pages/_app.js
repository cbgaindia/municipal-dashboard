import 'styles/app.css';

import Layout from 'components/layout/layout';
import { fetchAPI } from 'lib/api';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import React, { createContext } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import * as ga from '../lib/ga';

export const GlobalContext = createContext({});
function MyApp({ Component, pageProps, footer }) {
  if (typeof window !== 'undefined') {
    smoothscroll.polyfill();
  }
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) ga.pageview(url);
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_NEW) ga.pageviewNew(url);

      // change focus to top
      document.querySelector('#top-of-site-pixel-anchor').focus();

      if (Router.asPath == '/search') {
        document
          .querySelector('.header__search')
          .classList.add('header__search--hide');
      } else {
        document
          .querySelector('.header__search')
          .classList.remove('header__search--hide');
      }
    };

    const resetScroll = () => {
      // remove classes for blur and scroll disable
      document.body.classList.remove('scroll--disable');
      if (document.querySelector('.chapter'))
        document.querySelector('.chapter').classList.remove('chapter--blur');
      if (document.querySelector('.menu__dropdown')) {
        document
          .querySelector('.menu__dropdown')
          .classList.remove('menu__dropdown--active');
        document
          .querySelector('.menu__search-icon')
          .classList.remove('menu__search-icon--hide');
        document.querySelector('.content').classList.remove('content--active');
      }
    };

    Router.events.on('routeChangeStart', resetScroll);
    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', resetScroll);
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });
  const { global } = pageProps;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="alternate icon" href="/assets/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/favicon/favicon.svg"
        />
        <link
          rel="mask-icon"
          href="/assets/favicon/safari-pinned-tab.svg"
          color="#ff8a01"
        />
      </Head>
      <NextNprogress
        color="#4b4697"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        options={{ easing: 'ease', showSpinner: false, speed: 300 }}
      />
      <GlobalContext.Provider value={global.data[0]}>
        <Layout footer={footer}>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const global = await fetchAPI('/books?filters[slug]=municipal');
  const footer = await fetchAPI('/footer');
  return { ...appProps, footer, pageProps: { global } };
};

export default MyApp;
