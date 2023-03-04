// import AddKi from '../../assets/img/AddTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useState } from 'react';
import FormTextField from '../FormTextField/FormTextField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addChild } from '../../redux/info/info-operations';
import { INewChildData } from '../../types/info-types';
import text from './text.json';

interface IProp {
  toggleAddChildForm?: () => void;
}

const initialState: INewChildData = {
  name: '',
  gender: 'male',
};

const AddChildForm: React.FC<IProp> = ({ toggleAddChildForm }) => {
  const { lang } = useAppSelector(store => store.auth);
  const [child, setChild] = useState(initialState);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setChild(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addChild(child));
    setChild(initialState);
    if (toggleAddChildForm) toggleAddChildForm();
  };
  const { gender, name } = child;
  return (
    <form onSubmit={handleSubmit}>
      <FormTextField
        onChange={handleChange}
        value={name}
        name="name"
        type="text"
        maxLength={20}
        helper={text[lang].nameInputHelper}
        title={text[lang].nameInputTitle}
        label={text[lang].nameInputLabel}
      />
      <div className="flex items-center justify-center">
        <p className="mr-[40px] text-[14px] font-medium text-second-color">{text[lang].chooseGender}</p>

        <div>
          <div className="mb-[10px]">
            <label htmlFor="male" className="flex items-center text-[14px] font-medium text-second-color">
              <input
                id="male"
                className="absolute opacity-0"
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleChange}
                required
              />
              {gender === 'male' ? (
                <svg className="mr-[10px]" width="20" height="20">
                  <use href={sprite + '#checked'}></use>
                </svg>
              ) : (
                <svg className="mr-[10px]" width="20" height="20">
                  <use href={sprite + '#unchecked'}></use>
                </svg>
              )}
              {text[lang].boyInputLabel}
            </label>
          </div>
          <div>
            <label htmlFor="female" className="flex items-center text-[14px] font-medium text-second-color">
              <input
                id="female"
                className="absolute opacity-0"
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleChange}
              />
              {gender === 'female' ? (
                <svg className="mr-[10px]" width="20" height="20">
                  <use href={sprite + '#checked'}></use>
                </svg>
              ) : (
                <svg className="mr-[10px]" width="20" height="20">
                  <use href={sprite + '#unchecked'}></use>
                </svg>
              )}
              {text[lang].girlInputLabel}
            </label>
          </div>
        </div>
      </div>
      <button className="btn mx-auto mt-[20px] w-full text-[12px]" type="submit">
        {text[lang].saveBtn}
      </button>
    </form>
  );
};
export default AddChildForm;
