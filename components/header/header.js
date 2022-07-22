import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GlobalContext } from 'pages/_app';
import React from 'react';

const Header = ({ color }) => {
  const global = React.useContext(GlobalContext);
  const router = useRouter();
  const { asPath } = router;

  React.useEffect(() => {
    if (asPath == '/search') {
      document
        .querySelector('.header__search')
        .classList.add('header__search--hide');
    }
  }, [asPath]);
  
  return (
    <header className="header">
      <div className="header__container wrapper">
        <section className="branding">
          <Link href="/">
            <a>
              <h1 className="branding__logo">{global.name}</h1>
            </a>
          </Link>

          <span className="branding__seperator" />

          <a
            className="branding__obi"
            rel="noopener noreferrer"
            href="https://openbudgetsindia.org/"
          >
            <Image
              src="/assets/obi_header.png"
              alt="Open Budgets India"
              layout="fixed"
              width={201}
              height={28}
            />
          </a>
        </section>

        <Link href="/search">
          <a className="header__search">
            Search <span className="screen-reader-text">Page</span>
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
