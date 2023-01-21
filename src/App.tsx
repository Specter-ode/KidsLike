import Header from './components/Header/Header';
import PageRoutes from './routes/PageRoutes';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <div className="pb-[64px] sTablet:pb-[40px]">
      <Header />
      <PageRoutes />
      <Footer />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
