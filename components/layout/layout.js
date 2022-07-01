import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Skiplink from 'components/skiplink/skiplink';

export default function Layout({ children, footer }) {
  return (
    <>
      <Skiplink />
      <Header />
      {children}
      <Footer data={footer.data} />
    </>
  );
}
