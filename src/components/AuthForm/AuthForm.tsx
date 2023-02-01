import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { ReactComponent as Google } from '../../assets/icons/googleLogo.svg';
import { handleLogin, handleRegistration } from '../../redux/auth/auth-operations';
import { useAppDispatch } from '../../redux/hooks';
import { IFormItem } from '../../types/FormItem';
import { IFormTextField } from '../../types/FormTextField';
import Button from '../Button/Button';
import FormTextField from '../FormTextField/FormTextField';

const { REACT_APP_BACKEND_URL } = process.env;
// interface ILoginInitialState {
//   email: string;
//   password: string;
// }

interface IRegisterInitialState {
  name?: string;
  email: string;
  password: string;
}
interface IProps {
  btnTitle: string;
  items: IFormItem[];
  initialState: IRegisterInitialState;
}

const AuthForm: React.FC<IProps> = ({ btnTitle, items, initialState }): JSX.Element => {
  const [state, setState] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState(initialState);

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

    if (btnTitle === 'Войти') {
      dispatch(handleLogin(state));
    } else {
      dispatch(handleRegistration(state));
    }
    setState(initialState);
  };

  const { name, email, password } = state;

  const elements = items.map((item: IFormItem) => {
    const value = item.name === 'name' ? (name as string) : item.name === 'email' ? email : password;
    const error =
      item.name === 'name'
        ? (validationErrors.name as string)
        : item.name === 'email'
        ? validationErrors.email
        : validationErrors.password;
    return (
      <FormTextField
        key={nanoid()}
        onChange={handleChange}
        value={value}
        name={item.name}
        type={item.type}
        pattern={item?.pattern}
        error={error}
        helper={item.helper}
        title={item.title}
        label={item.label}
      />
    );
  });

  return (
    <div className="sTablet:mx-auto sTablet:w-[394px] sTablet:px-[32px] sTablet:py-[40px] sTablet:shadow-base ">
      <div className="mb-[20px]">
        <h3 className="mb-[20px] text-xs font-normal text-second-color">
          Вы можете авторизоваться с помощью Google Account:
        </h3>
        <a
          href={`${REACT_APP_BACKEND_URL}/auth/google`}
          className=" flex h-[42px] w-[48%] items-center justify-center rounded-[6px] border-gray-300 shadow-header hover:bg-accent-color sTablet:w-[160px] "
        >
          <Google className="w-[80px] hover:bg-accent-color" />
        </a>
      </div>
      <h3 className="mb-[20px] text-[12px] font-normal text-second-color">
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </h3>
      <form onSubmit={handleAuth}>
        {elements}
        <div className="flex justify-between">
          <Button title={btnTitle} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
