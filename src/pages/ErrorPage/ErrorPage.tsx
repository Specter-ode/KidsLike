import error404 from '../../assets/img/error404.jpg';
import { Link } from 'react-router-dom';
import text from './text.json';
import { useAppSelector } from '../../redux/hooks';

const ErrorPage = () => {
  const { lang } = useAppSelector(store => store.auth);
  return (
    <section
      role="alert"
      className="flex h-[calc(100vh-130px)] flex-col items-center justify-center sTablet:h-[calc(100vh-148px)]"
    >
      <img src={error404} alt="Error 404" className="rounded-[10px]" width={280} height={280} />
      <Link to="/">
        <p className="text-[20px] font-medium text-main-color hover:border-b-[3px] hover:border-accent-color hover:text-accent-color ">
          {text[lang].goHome}
        </p>
      </Link>
    </section>
  );
};

export default ErrorPage;
