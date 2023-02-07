import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { ReactComponent as Google } from '../../assets/icons/googleLogo.svg';
import { handleLogin } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';
import Button from '../Button/Button';
import FormTextField from '../FormTextField/FormTextField';
const { REACT_APP_BACKEND_URL } = process.env;

interface IState {
  email: string;
  password: string;
}

const initialState = {
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const [state, setState] = useState<IState>(initialState);
  const [validationErrors, setValidationErrors] = useState<IState>(initialState);

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
    dispatch(handleLogin(state));
    setState(initialState);
  };

  const { email, password } = state;

  return (
    <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base ">
      <div className="mb-[20px]">
        <h3 className="mb-[20px] text-xs font-normal text-second-color">
          Вы можете авторизоваться с помощью Google Account:
        </h3>
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[48%] items-center justify-center rounded-[6px] border-gray-300 shadow-base hover:bg-accent-color sTablet:w-[160px] "
        >
          <Google className="w-[80px] hover:bg-accent-color" />
        </a>
      </div>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </h3>
      <form onSubmit={handleAuth}>
        <FormTextField
          key={nanoid()}
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
          key={nanoid()}
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
        <div className="flex justify-between">
          <Button title="Войти" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
