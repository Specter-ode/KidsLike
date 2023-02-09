// import AddKi from '../../assets/img/AddTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useState } from 'react';
import Button from '../Button/Button';

interface IChild {
  id: string;
  name: string;
  gender: string;
}
const childList = [
  {
    id: 'Вова',
    name: 'Вова',
    gender: 'male',
  },
  {
    id: 'Милана',
    name: 'Милана',
    gender: 'male',
  },
  {
    id: 'Юлияzzzzzzzzzzzz',
    name: 'Юлияzzzzzzzzzzzz',
    gender: 'female',
  },
];

const KidsProfile: React.FC = () => {
  const [currentChild, setCurrentChild] = useState<string>('');
  console.log('currentChild: ', currentChild);
  const [currentChildInStore, setCurrentChildInStore] = useState<string>('Милана');
  console.log('currentChildInStore: ', currentChildInStore);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentChild(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentChildInStore(currentChild);

    // dispatch(handleRegistration(state));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-[20px] sLaptop:w-[181px] sLaptop:flex-col sLaptop:space-y-[8px]">
      <div className="mb-[10px] flex justify-between sMob:w-[376px] sTablet:mb-[20px] sTablet:w-auto sTablet:justify-center lessMob:w-[280px]">
        <p className="text-[14px] font-medium text-fifth-color">Выбран профиль ребенка:</p>
        <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">{currentChildInStore}</p>
      </div>
      <div className=" sTablet:flex sTablet:flex-wrap sTablet:justify-around">
        {childList.map(el => {
          return (
            <div className="flex sTablet:relative sTablet:pb-[35px] lessTablet:mb-[10px] lessTablet:min-h-[25px] lessTablet:items-center lessTablet:justify-between lessTablet:last:mb-0">
              <label
                htmlFor={el.name}
                key={el.id}
                className="flex items-center text-[14px] font-medium text-fifth-color "
              >
                <input
                  id={el.name}
                  className="absolute opacity-0"
                  type="radio"
                  name="Ребенок"
                  value={el.id}
                  checked={currentChild === el.id}
                  onChange={handleChange}
                />
                {currentChild === el.id ? (
                  <svg className="mr-[15px]" width="20" height="20">
                    <use href={sprite + '#checked'}></use>
                  </svg>
                ) : (
                  <svg className="mr-[15px]" width="20" height="20">
                    <use href={sprite + '#unchecked'}></use>
                  </svg>
                )}

                {el.name}
              </label>
              {currentChild !== currentChildInStore && currentChild === el.id && (
                <button
                  className="btn sTablet:absolute  sTablet:left-0 sTablet:top-[31px] lessTablet:ml-auto"
                  style={{ height: 'auto', width: '110px' }}
                  type="button"
                  onClick={() => {
                    setCurrentChildInStore(currentChild);
                  }}
                >
                  Подтвердить
                </button>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};
export default KidsProfile;
