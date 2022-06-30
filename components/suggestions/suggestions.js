import Link from 'next/link';
import { romanizeNumber } from 'utils/helpers';

const Suggestions = ({ chapter, chapters }) => (
  <section className="suggestions">
    <div className="wrapper">
      <div className="suggestions__head">
        <h2>You may also like</h2>
      </div>
      <div className="suggestions__container">
        <ul className="suggestions__list">
          {chapters.map((chap, index) => {
            if (chapter.chapter_no !== chap.chapter_no)
              return (
                <li className="suggestions__card" key={chapter.id + index}>
                  <Link key={chap.index} href={`/${chap.slug}`}>
                    <a>
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${chap.icon.url}`}
                        alt=""
                      />
                      <span className="navigation__id">
                        {romanizeNumber(chap.chapter_no)}
                      </span>
                      <h4>{chap.title}</h4>
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
);

export default Suggestions;
