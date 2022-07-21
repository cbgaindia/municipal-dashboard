import { getStrapiMedia } from 'lib/media';
import Image from 'next/image';

import * as data1 from './footer_data';

const Footer = ({ data }) => {
  const links = [data.social_links.github, data.social_links.twitter,data.social_links.facebook];
  const Attr_Social = data1.Attr_Social.links.map(
    (ele,index)=>({...ele,value:links[index]})
   );  

  return (
    <footer className="footer">
      <div className="footer__main wrapper">
        <a
          rel="noopener noreferrer"
          className="footer__logo"
          href="https://openbudgetsindia.org/en/"
        >
          <Image
            src={getStrapiMedia(data.obi_logo.url)}
            alt="Open budgets India Footer"
            layout="intrinsic"
            width={234}
            height={138}
          />
        </a>

        <div className="footer__links">
          <section className="footer__links-section">
            <p>{data.footer_column[0].name}</p>
            {data.footer_column[0].footer_link.map((link, index) => (
              <a
                key={`footer_link-1.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </section>

          <section className="footer__links-section">
            <p>{data.footer_column[1].name}</p>
            {data.footer_column[1].footer_link.map((link, index) => (
              <a
                key={`footer_link-2.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </section>

          <section className="footer__links-section">
            <p>{data.footer_column[2].name}</p>
            {data.footer_column[2].footer_link.map((link, index) => (
              <a
                key={`footer_link-3.${index}`}
                className="link footer_link"
                rel="noopener noreferrer"
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </section>
        </div>
      </div>

      <div className="attribute">
        <div className="attribute__container wrapper">
          <div className="attribute__links">
            {data.docs.links.map((link, index) => (
              <a
                key={`attr_link-${index}`}
                rel="noopener noreferrer"
                href={link.url}
                className="link footer_link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="attribute__logos">
            {data1.Attr_Logos.links.map((link, index) => (
              <a
                key={`attr_logo-${index}`}
                rel="nofollow noopener noreferrer"
                href={link.value}
                className="link footer_link"
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  layout="fixed"
                  width={link.dimensions[0]}
                  height={link.dimensions[1]}
                />
              </a>
            ))}
          </div>

          <div className="attribute__social">
            {Attr_Social.map((link, index) => (
              <a
                key={`attr_social-${index}`}
                rel="nofollow noopener noreferrer"
                href={link.value}
                className="link footer_link"
              >
                <Image
                  src={link.src}
                  alt={link.alt}
                  layout="fixed"
                  width={23}
                  height={23}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
