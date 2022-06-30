import Seo from 'components/seo/seo';
import { MeiliSearch } from 'meilisearch';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce, Truncate } from 'utils/helpers';

import { GlobalContext } from './_app';

const client = process.env.NEXT_PUBLIC_MEILISEARCH_API
  ? new MeiliSearch({
      apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API,
      host: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
    })
  : {};

const Search = () => {
  const [search, setSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const global = React.useContext(GlobalContext);

  useEffect(() => {
    const form = document.querySelector('.search__form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    return () => {
      form.removeEventListener('submit', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const seo = {
    ...global.seo,
    metaTitle: 'Search | Municipal Dashboard',
  };

  function formatContent(content) {
    if (!content.endsWith('...')) return `... ${content} ...`;
    return `... ${content}`;
  }

  async function onChange(e) {
    if (e.length > 0) {
      const index = client.index && client.index('sections');

      if (index)
        await index
          .search(e, {
            attributesToCrop: ['formattedContent'],
            attributesToHighlight: ['formattedContent', 'Title'],
            cropLength: 170,
            limit: 10,
          })
          .then((res) => {
            const list = res.hits.reduce((result, elm) => {
              if (elm.chapter) {
                result.push({
                  chapter_Slug: elm.chapter.slug,
                  chapter_Title: elm.chapter.Title,
                  content: formatContent(elm._formatted.formattedContent),
                  slug: `${elm.chapter ? elm.chapter.slug : '/'}#${elm.slug}`,
                  title: elm._formatted.Title,
                });
              }
              return result;
            }, []);
            setSearch(list);
            setShowSearch(true);
          });
    } else {
      setSearch([]);
      setShowSearch(false);
    }
  }

  const debouncedOnChange = useMemo(() => debounce(onChange, 150), []);

  return (
    <>
      <Seo seo={seo} />

      <div className="skiptarget">
        <span id="maincontent">-</span>
      </div>

      <main id="main" className="search wrapper">
        <form className="search__form" autoComplete="off" role="search">
          <div role="search">
            <label className="search__label" htmlFor="search">
              <span className="search__text">Search budget documents</span>
              <input
                id="search"
                className="search__input"
                type="search"
                autoComplete="off"
                inputMode="search"
                placeholder="Search..."
                onChange={(e) => debouncedOnChange(e.target.value)}
              />
            </label>
          </div>
        </form>

        {showSearch && (
          <div className="search__results">
            <p className="search__headline">Top Results</p>
            {search.length > 0 ? (
              <ol>
                {search.map((item, index) => (
                  <li key={`search-${index}`}>
                    <Link href={`/${item.slug}`}>
                      <a role="link" tabIndex="0" className="search__title">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Truncate(item.title, 300),
                          }}
                        />
                      </a>
                    </Link>
                    <div className="search__chapter">
                      <Link href={`/${item.chapter_Slug}`}>
                        <a role="link">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: Truncate(item.chapter_Title, 300),
                            }}
                          />
                        </a>
                      </Link>
                    </div>

                    <div
                      className="search__content"
                      dangerouslySetInnerHTML={{
                        __html: Truncate(item.content, 300),
                      }}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <p className="search__no-results">No results found</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
