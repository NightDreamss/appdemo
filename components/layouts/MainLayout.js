import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
