import sprite from '../../assets/icons/sprite.svg';
import { useState } from 'react';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCurrentChild } from '../../redux/info/info-slice';
import text from './text.json';

interface IProps {
  toggleAddChildForm: () => void;
}
const KidsProfile: React.FC<IProps> = ({ toggleAddChildForm }) => {
  const { width } = useWindowDimensions();
  const { lang } = useAppSelector(store => store.auth);
  const { currentChild, children } = useAppSelector(store => store.info);
  const [upgradeProfile, setUpdateProfile] = useState(false);
  const [childId, setChildId] = useState(currentChild?._id);
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
  console.log('currentChild?.gender: ', currentChild?.gender);

  const profileTitle = !currentChild || !currentChild?._id ? text[lang].profileIsNotChosen : text[lang].profileIsChosen;
  return (
    <div className="relative mb-[20px]" style={{ minHeight: children.length > 1 ? 56 : 'auto' }}>
      {upgradeProfile ? (
        <>
          <button
            className="btn absolute z-10 w-[120px] sTablet:left-0 sTablet:top-0 lessTablet:bottom-[-10px] lessTablet:right-0 "
            style={{
              height: 'auto',
            }}
            type="button"
            onClick={handleBack}
          >
            {text[lang].back}
          </button>
          <div className="relative flex items-center justify-between sMob:w-[376px] sTablet:h-[25px] sTablet:w-auto sTablet:justify-center lessMob:w-[280px]">
            <p className="text-[14px] font-medium text-fifth-color">{profileTitle}</p>
            <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">{currentChild?.name}</p>
            <svg className="ml-[5px] pb-[2px]" width="23" height="23">
              <use href={sprite + `#${currentChild?.gender}`}></use>
            </svg>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" mt-[10px] sTablet:flex sTablet:flex-wrap sTablet:justify-center lessTablet:pb-[25px]"
          >
            {children
              .filter(el => el._id !== currentChild?._id)
              .map(el => {
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
                        className="btn w-[120px] sTablet:absolute sTablet:right-0  sTablet:top-0 lessTablet:ml-auto"
                        style={{
                          height: 'auto',
                        }}
                      >
                        {text[lang].choose}
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
            <div className="w-[280px] sMob:w-[376px]">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-fifth-color">{profileTitle}</p>
                <div className="ml-[10px] flex items-center">
                  <p className=" text-[14px] font-bold text-main-color">{currentChild?.name || ''}</p>
                  <svg className="ml-[5px] pb-[2px]" width="23" height="23">
                    <use href={sprite + `#${currentChild?.gender}`}></use>
                  </svg>
                </div>
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
                  {text[lang].add}
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
                    {text[lang].change}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                className="btn w-[120px]"
                style={{
                  height: 'auto',
                }}
                type="button"
                onClick={toggleAddChildForm}
              >
                {text[lang].add}
              </button>
              <div className=" flex items-center">
                <p className="text-[14px] font-medium text-fifth-color">{profileTitle}</p>
                <p className="ml-[10px] flex items-center text-[14px] font-bold text-main-color">
                  {currentChild?.name}
                </p>
                <svg className="ml-[5px] pb-[2px]" width="23" height="23">
                  <use href={sprite + `#${currentChild?.gender}`}></use>
                </svg>
              </div>
              {
                <button
                  className="btn w-[120px]"
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
                  {text[lang].change}
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
