import Header from './components/Header/Header';
import PageRoutes from './routes/PageRoutes';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <div>
        <Header />
        <PageRoutes />
      </div>
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </>
  );
};

export default App;
