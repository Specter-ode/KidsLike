// import AddKi from '../../assets/img/AddTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentChild } from '../../redux/info/info-slice';

interface IProps {
  toggleAddChildForm: () => void;
}
const KidsProfile: React.FC<IProps> = ({ toggleAddChildForm }) => {
  const { width } = useWindowDimensions();

  const [upgradeProfile, setUpdateProfile] = useState(false);
  const { currentChild, children } = useAppSelector(store => store.info);
  console.log('children: ', children);
  const [childId, setChildId] = useState(currentChild._id);
  console.log('currentChild: ', currentChild);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChildId(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const childData = children.find(el => el._id === childId);
    if (childData) {
      dispatch(setCurrentChild(childData));
      setUpdateProfile(false);
    }
  };
  const handleBack = () => {
    setUpdateProfile(false);
    setChildId('');
  };

  return (
    <div className="relative mb-[20px] ">
      {upgradeProfile ? (
        <>
          <button
            className="btn absolute z-10 w-[100px] sTablet:left-0 sTablet:top-0 lessTablet:bottom-[-10px] lessTablet:right-0 "
            style={{
              height: 'auto',
            }}
            type="button"
            onClick={handleBack}
          >
            Вернуться
          </button>
          <div className="relative flex items-center justify-between sMob:w-[376px] sTablet:h-[25px] sTablet:w-auto sTablet:justify-center lessMob:w-[280px]">
            <p className="text-[14px] font-medium text-fifth-color">Выбран профиль ребенка:</p>
            <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">{currentChild.name}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" mt-[10px] sTablet:flex sTablet:flex-wrap sTablet:justify-center lessTablet:pb-[25px]"
          >
            {children
              .filter(el => {
                console.log('filter el._id: ', el._id);
                console.log('filter currentChild._id}: ', currentChild._id);

                return el._id !== currentChild._id;
              })
              .map(el => {
                console.log('el: ', el);
                console.log('childId: ', childId);

                return (
                  <div
                    key={el._id}
                    className="flex sTablet:mr-[20px] sTablet:min-w-[110px] sTablet:flex-col sTablet:items-center sTablet:justify-center sTablet:last:mr-0 lessTablet:mb-[5px] lessTablet:min-h-[25px] lessTablet:items-center lessTablet:justify-between lessTablet:last:mb-0"
                  >
                    <label htmlFor={el.name} className="flex items-center text-[14px] font-medium text-fifth-color ">
                      <input
                        id={el.name}
                        className="absolute opacity-0"
                        type="radio"
                        name="Ребенок"
                        value={el._id}
                        checked={childId === el._id}
                        onChange={handleChange}
                      />
                      {childId === el._id ? (
                        <svg className="mr-[5px]" width="21" height="21">
                          <use href={sprite + '#checked'}></use>
                        </svg>
                      ) : (
                        <svg className="mr-[5px]" width="21" height="21">
                          <use href={sprite + '#unchecked'}></use>
                        </svg>
                      )}

                      {el.name}
                    </label>
                    {childId === el._id && (
                      <button
                        className="btn w-[100px] sTablet:absolute sTablet:right-0  sTablet:top-0 lessTablet:ml-auto"
                        style={{
                          height: 'auto',
                        }}
                      >
                        Выбрать
                      </button>
                    )}
                  </div>
                );
              })}
          </form>
        </>
      ) : (
        <>
          {width < 768 ? (
            <div className="mb-[10px] w-[280px] sMob:w-[376px]">
              <div className="flex justify-between">
                <p className="text-[14px] font-medium text-fifth-color">Выбран профиль ребенка:</p>
                <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">
                  {currentChild.name || 'Информация отсутствует'}
                </p>
              </div>
              <div className="mt-[10px] flex justify-between">
                <button
                  className="btn w-full"
                  style={{
                    height: 'auto',
                  }}
                  type="button"
                  onClick={toggleAddChildForm}
                >
                  Добавить
                </button>
                {children.length > 1 && (
                  <button
                    className="btn  ml-[10px] w-full"
                    style={{
                      height: 'auto',
                    }}
                    type="button"
                    onClick={() => {
                      setUpdateProfile(true);
                    }}
                  >
                    Изменить
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-[10px] flex justify-between">
              <button
                className="btn w-[100px]"
                style={{
                  height: 'auto',
                }}
                type="button"
                onClick={toggleAddChildForm}
              >
                Добавить
              </button>
              <div className=" flex items-center">
                <p className="text-[14px] font-medium text-fifth-color">Выбран профиль ребенка:</p>
                <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">
                  {currentChild.name || 'Информация отсутствует'}
                </p>
              </div>
              {
                <button
                  className="btn w-[100px]"
                  style={{
                    height: 'auto',
                    opacity: children.length > 1 ? 1 : 0,
                    pointerEvents: children.length > 1 ? 'auto' : 'none',
                  }}
                  type="button"
                  onClick={() => {
                    setUpdateProfile(true);
                  }}
                >
                  Изменить
                </button>
              }
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default KidsProfile;
