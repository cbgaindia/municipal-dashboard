import Link from 'next/link';

export default function Card({ chapter }) {
  return (
    <li className="card">
      <Link key={chapter.index} href={`/${chapter.slug}`}>
        <a className="card__content">
          {chapter.totalArticles == 0 && (
            <>
              <img
                src="/assets/icons/coming_soon.png"
                alt=""
                className="card__soon"
              />
              <span className="screen-reader-text">Coming Soon:</span>
            </>
          )}

          <picture className="card__image">
            <source
              srcSet={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chapter.icon.url}`}
              media="(min-width: 100px)"
            />

            <img
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              alt=""
              width="264"
              height="1"
              className="card__icon"
            />
          </picture>
          <div className="card__text_container">
            <h2 className="card__title">{chapter.title}</h2>
            {chapter.Desc && <p className="card__desc">{chapter.Desc}</p>}
          </div>
        </a>
      </Link>
    </li>
  );
}
