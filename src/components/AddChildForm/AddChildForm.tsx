// import AddKi from '../../assets/img/AddTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useState } from 'react';
import Button from '../Button/Button';
import FormTextField from '../FormTextField/FormTextField';

interface IChild {
  id: string;
  name: string;
  gender: string;
}

const AddChildForm: React.FC = () => {
  const [child, setChild] = useState<IChild>({} as IChild);
  console.log('AddChildForm child: ', child);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, name } = e.target;
    setChild(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChild({} as IChild);

    // dispatch(handleRegistration(state));
    // setModalClose()
  };
  const { gender, name } = child;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[280px] justify-between sMob:w-[376px] sLaptop:w-[181px] sLaptop:flex-col sLaptop:space-y-[8px]"
    >
      <FormTextField
        onChange={handleChange}
        value={name}
        name="name"
        type="text"
        helper="от 3 до 20 символов"
        title="Имя Ребенка должно содержать от 3 до 20 символов."
        label="Имя пользователя"
      />
      <p className="mb-[10px]">Выбрать пол:</p>
      <div className="p-[20px]">
        <label htmlFor="male" className="flex items-center">
          <input
            id="male"
            className="text-[14px] text-main-color"
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={handleChange}
          />
          {gender === 'male' ? (
            <svg width="20" height="20">
              <use href={sprite + '#checked'}></use>
            </svg>
          ) : (
            <svg width="20" height="20">
              <use href={sprite + '#unchecked'}></use>
            </svg>
          )}
          Мальчик
        </label>
      </div>
      <div className="p-[20px]">
        <label htmlFor="female" className="flex items-center">
          <input
            id="female"
            className="text-[14px] text-main-color"
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={handleChange}
          />
          {gender === 'female' ? (
            <svg width="20" height="20">
              <use href={sprite + '#checked'}></use>
            </svg>
          ) : (
            <svg width="20" height="20">
              <use href={sprite + '#unchecked'}></use>
            </svg>
          )}
          Девочка
        </label>
      </div>

      {<Button title="Сохранить" />}
    </form>
  );
};
export default AddChildForm;
