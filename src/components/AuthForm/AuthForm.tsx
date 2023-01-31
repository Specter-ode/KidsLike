import React, { useState } from 'react';
import { ReactComponent as Google } from '../../assets/icons/googleLogo.svg';
import { handleLogin, handleRegistration } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';

const { REACT_APP_BACKEND_URL } = process.env;
interface IFormInitialState {
  email: string;
  password: string;
}
const initialState = {
  email: '',
  password: '',
};

const AuthForm: React.FC = () => {
  const [state, setState] = useState<IFormInitialState>(initialState);
  const [buttonType, setButtonType] = useState<string>('');

  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('buttonType: ', buttonType);
    if (buttonType === 'register') {
      dispatch(handleRegistration(state));
    } else {
      dispatch(handleLogin(state));
    }
    setState(initialState);
  };

  const { email, password } = state;
  return (
    <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base">
      <div className="mb-[20px]">
        <h3 className="mb-[20px] text-xs font-normal text-second-color">
          Вы можете авторизоваться с помощью Google Account:
        </h3>
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[48%] items-center justify-center rounded-[6px] bg-third-bg-color shadow-header hover:bg-accent-color sTablet:w-[160px] "
        >
          <Google className="w-[80px] hover:bg-accent-color" />
        </a>
      </div>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </h3>
      <form onSubmit={handleAuth}>
        <div className="mb-[24px]">
          <label htmlFor="email" className="text-[12px] font-normal text-second-color">
            *Email:
          </label>
          <input
            onChange={handleChange}
            value={email}
            name="email"
            placeholder="your@email.com"
            id="email"
            type="text"
            className="mt-[8px] w-full bg-third-bg-color px-[8px] py-[12px]"
          />
        </div>
        <div className="mb-[24px]">
          <label htmlFor="password" className=" text-[12px] font-normal text-second-color">
            *Пароль:
          </label>
          <input
            onChange={handleChange}
            value={password}
            name="password"
            placeholder="мининум 8 символов"
            id="password"
            type="text"
            className="mt-[8px] w-full bg-third-bg-color px-[8px] py-[12px]"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="btn"
            type="submit"
            onClick={() => {
              setButtonType('login');
            }}
          >
            Войти
          </button>
          <button
            className="btn"
            type="submit"
            onClick={() => {
              setButtonType('register');
            }}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
