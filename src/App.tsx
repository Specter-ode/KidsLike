import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';

const App: React.FC = () => {
  const router = createBrowserRouter(createRoutesFromElements(Root), { basename: '/' });
  return (
    <div className="min-h-screen lessTablet:pb-[66px]">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" transition={Zoom} />
    </div>
  );
};

export default App;
