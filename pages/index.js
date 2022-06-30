import Card from 'components/card/card';
import Carousel from 'components/carousel/carousel';
import Seo from 'components/seo/seo';
import { fetchAPI } from 'lib/api';
import Link from 'next/link';
import React from 'react';
import { sortList } from 'utils/helpers';

import { GlobalContext } from './_app';

export default function Home() {
  const global = React.useContext(GlobalContext);

  const chapterList = React.useMemo(() => sortList(global.chapters), [global]);
  return (
    <>
      <Seo seo={global.seo} />

      <section className="home__mobile-search">
        <Link href="/search">
          <a>Search</a>
        </Link>
      </section>
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>
      <main id="main" tabIndex="-1" className="wrapper">
        <div className="home__desc">
          <h2>{global.desc}</h2>
        </div>
        <ul className="home__cards">
          {chapterList?.map((chapter, index) => {
            const chapterDetails = {
              Desc: chapter.desc,
              icon: chapter.icon,
              index,
              slug: chapter.slug,
              title: chapter.title,
              totalArticles: chapter.sections?.length,
            };
            return (
              <React.Fragment key={chapter.id}>
                <Card chapter={chapterDetails} />
              </React.Fragment>
            );
          })}
        </ul>
      </main>
      <Carousel youtube={global.youtube} />
    </>
  );
}

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');

  return {
    props: {
      homepage: homepage.data,
    },
    revalidate: 1,
  };
}
