import React, { useState } from 'react';
import sprite from '../../assets/icons/sprite.svg';
import { handleRegistration } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';
import FormTextField from '../FormTextField/FormTextField';
const { REACT_APP_BACKEND_URL } = process.env;

interface IState {
  username: string;
  email: string;
  password: string;
}

const initialState = {
  username: '',
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const [state, setState] = useState<IState>(initialState);
  console.log('state: ', state);
  const [validationErrors, setValidationErrors] = useState<IState>(initialState);
  console.log('validationErrors: ', validationErrors);

  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, validationMessage } = e.target;
    setValidationErrors(prevState => ({
      ...prevState,
      [name]: validationMessage,
    }));
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(handleRegistration(state));
    setState(initialState);
  };

  const { username, email, password } = state;

  return (
    <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base ">
      <div className="mb-[20px]">
        <h3 className="mb-[20px] text-xs font-normal text-second-color">
          Вы можете авторизоваться с помощью Google Account:
        </h3>
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[48%] items-center justify-center rounded-[6px] border-gray-300 shadow-base transition duration-500 hover:bg-accent-color sTablet:w-[160px] "
        >
          <svg width="85" height="20">
            <use href={sprite + '#google'}></use>
          </svg>
        </a>
      </div>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">Или зарегистрироваться с помощью формы:</h3>
      <form onSubmit={handleAuth}>
        <FormTextField
          onChange={handleChange}
          value={username}
          name="username"
          type="text"
          error={validationErrors.username}
          helper="от 3 до 40 символов"
          title="Имя пользователя должно содержать от 3 до 40 символов."
          label="Имя пользователя"
        />
        <FormTextField
          onChange={handleChange}
          value={email}
          name="email"
          type="email"
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          error={validationErrors.email}
          helper="example@gmail.com"
          title="example@gmail.com"
          label="Электронная почта"
        />
        <FormTextField
          onChange={handleChange}
          value={password}
          name="password"
          type="password"
          minLength={8}
          error={validationErrors.password}
          helper="от 8 до 40 символов"
          title="Пароль должен содержать от 8 до 40 символов."
          label="Пароль"
        />
        <button type="submit" className="btn w-full">
          Регистрация
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
