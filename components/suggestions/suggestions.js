import Link from 'next/link';
import { romanizeNumber } from 'utils/helpers';

const Suggestions = ({ chapter }) => (
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
);

export default Suggestions;
