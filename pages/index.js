import React from 'react';
import Link from 'next/link';
import { fetchAPI } from 'lib/api';
import Seo from 'components/seo/seo';
import Card from 'components/card/card';
import { sortList } from 'utils/helpers';
import Header from 'components/header/header';
import Highlight from 'components/highlights/highlights';
import Carousel from 'components/carousel/carousel';

export default function Home({ homepage, chapters }) {
  sortList(chapters);
  function headerDesc() {
    return <p className="header__desc">{homepage.heading}</p>;
  }

  return (
    <>
      {/* <Seo seo={homepage.seo} />

      <Header desc={headerDesc()} color="#101524" />
      {homepage.highlight.length > 0 && <Highlight data={homepage.highlight} />} */}

      <section className="home__mobile-search">
        <Link href="/search">
          <a>Search</a>
        </Link>
      </section>
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>
      <main id="main" tabIndex="-1" className="wrapper">
        <ul className="home__cards">
          {chapters.map((chapter, index) => {
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
      {/* <Carousel youtube={homepage.youtube} /> */}
    </>
  );
}

export async function getStaticProps() {
  const homepage = await fetchAPI('/homepage');
  const chapters = await fetchAPI('/chapters');

  return {
    props: { homepage, chapters: chapters.data },
    revalidate: 1,
  };
}
