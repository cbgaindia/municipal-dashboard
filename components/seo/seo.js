import Head from 'next/head';
import { useContext } from 'react';
import { GlobalContext } from 'pages/_app';
import { getStrapiMedia } from 'lib/media';
import { useRouter } from 'next/router';

const Seo = ({ seo }) => {
  const fullSeo = {
    metaTitle: `${seo.metaTitle}`,
    metaDescription: `${seo.metaDescription}`,
    shareImage: seo.icon
      ? getStrapiMedia(seo.icon.url)
      : getStrapiMedia(seo.shareImage),
  };
console.log(seo.icon, fullSeo);
  // if (router.route == '/') {
  //   fullSeo.metaTitle = `${title} | ${siteName}`;
  // }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {seo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
