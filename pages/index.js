import React from 'react';
import Link from 'next/link';
import { fetchAPI } from 'lib/api';
import Seo from 'components/seo/seo';
import Card from 'components/card/card';
import { sortList } from 'utils/helpers';
import Header from 'components/header/header';
import Carousel from 'components/carousel/carousel';

export default function Home({ global }) {
  const chapterList = React.useMemo(
    () => sortList(global.chapters),
    [global.chapters]
  );
  return (
    <>
      <Seo seo={global.seo} />
      <Header title={global.name} color="#212142" />

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
              title: chapter.title,
              slug: chapter.slug,
              icon: chapter.icon,
              Desc: chapter.Desc,
              totalArticles: chapter.sections?.length,
              index,
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
  const global = await fetchAPI('/books?filters[slug]=municipal');
  const homepage = await fetchAPI('/homepage');
  const chapters = await fetchAPI('/chapters');

  return {
    props: {
      homepage: homepage.data,
      chapters: chapters.data,
      global: global.data[0],
    },
    revalidate: 1,
  };
}
