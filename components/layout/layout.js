import Footer from 'components/footer/footer';
import Header from 'components/header/header';
import Skiplink from 'components/skiplink/skiplink';

export default function Layout({ children }) {
  return (
    <>
      <Skiplink />
      <Header color="#212142" />
      {children}
      <Footer />
    </>
  );
}
