import Image from 'next/image';
import Link from 'next/link';
import { romanizeNumber } from 'utils/helpers';

const Navigation = ({ back, forward, isHindi = false }) => (
  <section className="navigation">
    <div className="wrapper">
      <div className={`navigation__container `}>
        {back != undefined && (
          <div
            className={`navigation__back ${
              forward == undefined ? 'navigation__back--only' : null
            }`}
          >
            <Link href={isHindi ? `/hn/${back.slug}` : `/${back.slug}`}>
              <a>
                <div className="navigation__img">
                  <span className="navigation__id">
                    {romanizeNumber(back.chapter_no)}
                  </span>
                  <Image
                    width={200}
                    height={200}
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
          </div>
        )}

        {forward != undefined && (
          <div
            className={`navigation__next ${
              back == undefined ? 'navigation__next--only' : null
            }`}
          >
            <Link href={isHindi ? `/hn/${forward.slug}` : `/${forward.slug}`}>
              <a>
                <div className="navigation__img">
                  <span className="navigation__id">
                    {romanizeNumber(forward.chapter_no)}
                  </span>
                  <Image
                    width={200}
                    height={200}
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
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Navigation;
