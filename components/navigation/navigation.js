import Link from 'next/link';
import { romanizeNumber } from 'utils/helpers';

const Navigation = ({ back, forward, isHindi = false }) => (
  <section className="navigation">
    <div className="wrapper">
      <div className={`navigation__container `}>
        {back != undefined && (
          <Link href={isHindi ? `/hn/${back.slug}` : `/${back.slug}`}>
            <a className="navigation__back">
              <div className="navigation__img">
                <span className="navigation__id">
                  {romanizeNumber(back.chapter_no)}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${back.icon.url}`}
                  alt=""
                />
              </div>
              <span>
                <p>{isHindi ? 'पूर्व सेक्शन' : 'Previous Section'}</p>
                <h2>{back.title}</h2>
              </span>
            </a>
          </Link>
        )}

        {forward != undefined && (
          <Link href={isHindi ? `/hn/${forward.slug}` : `/${forward.slug}`}>
            <a className="navigation__next">
              <div className="navigation__img">
                <span className="navigation__id">
                  {romanizeNumber(forward.chapter_no)}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${forward.icon.url}`}
                  alt=""
                />
              </div>
              <span>
                <p>{isHindi ? 'अगला सेक्शन' : 'Next Section'}</p>
                <h2>{forward.title}</h2>
              </span>
            </a>
          </Link>
        )}
      </div>
    </div>
  </section>
);

export default Navigation;
