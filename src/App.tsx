import Header from './components/Header/Header';
import PageRoutes from './routes/PageRoutes';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import { useState } from 'react';

const App: React.FC = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
  const onClose = () => {
    setIsBurgerMenu(false);
  };
  return (
    <div className="pb-[64px] sTablet:pb-[40px]">
      <Header />
      {/* <BurgerMenu onClose={onClose} /> */}
      <PageRoutes />
      <Footer />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
