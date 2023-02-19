import React, { useState } from 'react';
import { handleRegistration } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';
import FormTextField from '../FormTextField/FormTextField';

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
    dispatch(handleRegistration(state));
    setState(initialState);
  };

  const { username, email, password } = state;

  return (
    <form onSubmit={handleAuth}>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">Или зарегистрироваться с помощью формы:</h3>
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
  );
};

export default RegisterForm;
