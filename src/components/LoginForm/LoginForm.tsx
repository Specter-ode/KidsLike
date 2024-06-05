import React, { useState } from 'react';
import { handleLogin } from '../../redux/auth/auth-operations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import FormTextField from '../FormTextField/FormTextField';
import text from './text.json';

interface IState {
  email: string;
  password: string;
}

const initialState = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [state, setState] = useState<IState>(initialState);
  const [validationErrors, setValidationErrors] = useState<IState>(initialState);
  const { lang, isLoading } = useAppSelector(store => store.auth);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleAuth = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(handleLogin(state));
    setState(initialState);
  };

  const { email, password } = state;

  return (
    <form onSubmit={handleAuth}>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">{text[lang].notSocialAuth}</h3>
      <FormTextField
        onChange={handleChange}
        value={email}
        name="email"
        type="email"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
        error={validationErrors.email}
        helper="example@gmail.com"
        title="example@gmail.com"
        label={text[lang].emailLabel}
      />
      <FormTextField
        onChange={handleChange}
        value={password}
        name="password"
        type="password"
        minLength={8}
        error={validationErrors.password}
        helper={text[lang].passwordHelper}
        title={text[lang].passwordTitle}
        label={text[lang].passwordLabel}
      />
      <div className="flex justify-center">
        <button type="submit" className="btn w-full" disabled={isLoading}>
          {isLoading ? text[lang].loading : text[lang].comeIn}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
