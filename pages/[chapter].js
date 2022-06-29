import React from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { getStrapiMedia } from 'lib/media';
import { fetchAPI } from 'lib/api';
import {
  romanizeNumber,
  sortList,
  stripTable,
  tooltipKeyword,
} from 'utils/helpers';
import useWindowDimensions from 'utils/useWindowDimensions';
import Seo from 'components/seo/seo';
import Navigation from 'components/navigation/navigation';
import Menu from 'components/menu/menu';
import Sidebar from 'components/sidebar/sidebar';
import useLayoutEffect from 'utils/use-isomorphic-layout-effect';
import Carousel from 'components/carousel/carousel';
import { GlobalContext } from './_app';

function goToTopHandler() {
  if (window.scrollY > 600)
    document.querySelector('.back-top').classList.add('active');
  else document.querySelector('.back-top').classList.remove('active');
}

const Chapter = ({ chapter }) => {
  const global = React.useContext(GlobalContext);

  const { width } = useWindowDimensions();
  useLayoutEffect(() => {
    const jumpIcon = document.querySelector('.back-top');
    gsap.registerPlugin(ScrollTrigger);

    if (chapter.sections.length > 0) {
      stripTable();
      tooltipKeyword(chapter);
    }

    // go-to-top
    document.addEventListener('scroll', goToTopHandler);
    jumpIcon.addEventListener('click', (e) => {
      e.preventDefault();
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('#top-of-site-pixel-anchor').focus({
          preventScroll: true,
        });
      }, 10);
    });
    return () => {
      jumpIcon.removeEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      document.removeEventListener('scroll', goToTopHandler);
    };
  }, [chapter, width]);

  React.useMemo(() => {
    sortList(chapter.sections);
    sortList(global.chapters);
  }, [chapter, global]);

  const seo = {
    metaTitle: chapter.title,
    metaDescription: chapter.desc,
    article: true,
    icon: chapter.icon,
  };

  return (
    <>
      <Seo seo={seo} />

      {width < 1025 && chapter.sections.length > 0 && (
        <Menu chapter={chapter} isMobile={width < 1025} />
      )}
      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>
      {chapter.sections.length > 0 ? (
        <main id="main" className="chapter wrapper">
          <Sidebar chapter={chapter} />

          <section className="chapter__container">
            <div className="chapter__heading-image">
              <div className="chapter_page_roam">
                <p>{romanizeNumber(chapter.chapter_no)}</p>
              </div>
              <picture className="chapter_heading_img">
                <source
                  srcSet={getStrapiMedia(chapter.head_image.url)}
                  media="(min-width: 100px)"
                />

                <img
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  alt=""
                  width="150"
                  height="120"
                />
              </picture>
            </div>
            <div className="chapter__content">
              <h1>{chapter.title}</h1>
              {chapter.sections.map((article, index) => (
                <article
                  className="section chapter-content-container"
                  id={article.slug}
                  key={article.id}
                >
                  <div className="chapter_body_padding">
                    <div className="section__heading">
                      <h2 className="section_number_chap">
                        {index + 1}. <span className="section__bar" />{' '}
                        {article.title}
                      </h2>
                      <a href={`#${article.slug}`} className="section__anchor">
                        <span aria-hidden="true">{/* # */}</span>
                        <span className="screen-reader-text">
                          {`Section titled ${article.title}`}
                        </span>
                      </a>
                    </div>

                    <div
                      className="section__content"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <div className="no-content">
          <p>To be updated soon</p>
        </div>
      )}

      <Navigation
        back={global.chapters[chapter.chapter_no - 2]}
        forward={global.chapters[chapter.chapter_no]}
        currentchapter={chapter.chapter_no}
      />
      <section className="seggestion-section-chapter-page">
        <div className="wrapper">
          <div className="suggestion_head">
            <h2>You may also like</h2>
          </div>
          <div className="card_suggestion_container">
            <ul className="card_suggestion_ul">
              {global.chapters.map((chap, index) => {
                if (chapter.chapter_no !== chap.chapter_no && index < 9)
                  return (
                    <li className="suggestion_card" key={chapter.id}>
                      <Link key={chap.index} href={`/${chap.slug}`}>
                        <a>
                          <div className="suggestion_img_container">
                            <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chap.icon.url}`}
                              alt=""
                            />
                            <div className="text_suggestion_container">
                              <div className="suggestion_roam">
                                <p>{romanizeNumber(chap.chapter_no)}</p>
                              </div>
                              <div className="chapter_suggestion_head">
                                <h4>{chap.title}</h4>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                return null;
              })}
            </ul>
          </div>
          <div className="suggesstion_card_container" />
        </div>
      </section>
      <Carousel youtube={global.youtube} />

      <a href="#top-of-site-pixel-anchor" type="button" className="back-top">
        <span className="screen-reader-text">Back to Top</span>
        <svg width="32" height="32" viewBox="0 0 100 100">
          <path
            d="m50 0c-13.262 0-25.98 5.2695-35.355 14.645s-14.645 22.094-14.645 35.355 
          5.2695 25.98 14.645 35.355 22.094 14.645 35.355 14.645 25.98-5.2695 35.355-14.645 
          14.645-22.094 14.645-35.355-5.2695-25.98-14.645-35.355-22.094-14.645-35.355-14.645zm20.832 
          62.5-20.832-22.457-20.625 22.457c-1.207 0.74219-2.7656 0.57812-3.7891-0.39844-1.0273-0.98047-1.2695-2.5273-0.58594-3.7695l22.918-25c0.60156-0.61328 
          1.4297-0.96094 2.2891-0.96094 0.86328 0 1.6914 0.34766 2.293 0.96094l22.918 25c0.88672 1.2891 0.6875 3.0352-0.47266 4.0898-1.1562 1.0508-2.9141 1.0859-4.1133 0.078125z"
          />
        </svg>
      </a>
    </>
  );
};

export async function getStaticPaths() {
  const chapters = await fetchAPI('/chapters');
  return {
    paths: chapters.data.map((chapter) => ({
      params: {
        chapter: chapter.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const chapter = await fetchAPI(`/chapters?filters[slug]=${params.chapter}`);

  return {
    props: { chapter: chapter.data[0] },
    revalidate: 1,
  };
}

export default Chapter;
