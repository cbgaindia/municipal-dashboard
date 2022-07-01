import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Skiplink from 'components/skiplink/skiplink';

export default function Layout({ children, footer }) {
  console.log(footer.data.social_links);
  return (
    <>
      <Skiplink />
      <Header color="#212142" />
      {children}
      <Footer data={footer.data} />
    </>
  );
}
