import addtask from '../../assets/img/addTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTaskFormModalStatus } from '../../redux/auth/auth-slice';
import { useState } from 'react';
import * as validateImage from '../../services/helpers/validateImage';
import { toast } from 'react-toastify';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { useLocation } from 'react-router-dom';
import { addGift, addTask } from '../../redux/info/info-operations';
interface IState {
  title: string;
  reward: number;
  avatar: string;
}
const initialState = {
  title: '',
  reward: 0,
  avatar: '',
};

const NewTaskForm: React.FC = () => {
  const { pathname } = useLocation();
  const awardsPagePath = pathname === '/awards' || pathname === '/awards/*';
  const { width } = useWindowDimensions();
  const [state, setState] = useState<IState>(initialState); // state формы, который мы отправляем при onSubmit
  const [avatarName, setAvatarName] = useState(''); // название файла, необходимо для рендера в custom file input
  const { currentChild } = useAppSelector(store => store.info);
  const dispatch = useAppDispatch();
  const { title, reward, avatar } = state;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, files } = e.target;
    const newValue = () => {
      if (type === 'file' && files) {
        if (files.length === 0) {
          setAvatarName('');
          return;
        }
        const file = files[0];
        if (validateImage.typeError(file)) {
          // валидация по типу файла
          toast.error("Картинка должна соответствоват одному из форматов: '.jpg', '.jpeg', '.gif', '.png'");
          return;
        }
        if (validateImage.maxAllowedSizeError(file)) {
          // валидация по размеру МБ
          toast.error('Размер файла должен быть меньше 1 Мб');
          return;
        }
        // if (validateImage.isImageSizeValid(file)) {
        //   // валидация по высоте и ширине
        //   toast.error('Размер картинки должна быть от 100 до 1000px');
        //   return;
        // }
        setAvatarName(file.name); // после прохождения проверок сохраняем

        return file;
      }
      return value.trim();
    };

    setState(prevState => ({
      ...prevState,
      [name]: newValue(),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTaskFormModalStatus(false));
    if (awardsPagePath) {
      dispatch(addGift({ data: { title, price: reward, avatar }, childId: currentChild._id }));
    } else {
      dispatch(addTask({ data: { ...state }, childId: currentChild._id }));
    }
  };
  const disabled = title.length < 3 || !avatar || reward < 1;
  return (
    <div className="w-[376px] overflow-hidden lessMob:w-[280px]">
      <form onSubmit={handleSubmit} className="relative bg-accent-color" encType="multipart/form-data">
        <div>
          <img className="h-[176px]  w-full bg-main-bg lessMob:h-[131px]" src={addtask} alt="Hi, please add task" />
        </div>
        <div className=" px-[28px] pt-[24px] pb-[32px]">
          <div className="relative mb-[7px]">
            <label htmlFor="card-title">
              <span className="absolute top-[5px]">
                <svg width="24" height="24">
                  <use href={sprite + '#pencil'}></use>
                </svg>
              </span>
              <input
                name="title"
                value={title}
                id="card-title"
                placeholder=" Добавить задание..."
                type="text"
                maxLength={50}
                minLength={3}
                onChange={handleChange}
                className="w-full border-b border-main-bg bg-transparent py-[7px] pl-[28px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:italic placeholder:text-main-bg"
              />
            </label>
          </div>
          <div className="relative mb-[7px]">
            <label htmlFor="card-value">
              <span className="absolute top-[5px]">
                <svg width="24" height="24">
                  <use href={sprite + '#pencil'}></use>
                </svg>
              </span>
              <input
                name="reward"
                value={reward}
                id="card-value"
                placeholder=" Добавить баллы..."
                type="number"
                onChange={handleChange}
                className="w-full border-b border-main-bg  bg-transparent py-[7px] pl-[28px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:italic placeholder:text-main-bg"
              />
            </label>
          </div>
          <div className="relative  border-b border-main-bg">
            <label htmlFor="card-avatar" className="flex">
              <input
                id="card-avatar"
                type="file"
                name="avatar"
                accept="image/jpg, image/jpeg, image/gif, image/png"
                onChange={handleChange}
                className="absolute left-0 top-0 h-[36px] w-full opacity-0"
              />
              <span className="mr-[11px] flex items-center">
                <svg width="21" height="19" className="fill-main-bg">
                  <use href={sprite + '#image'}></use>
                </svg>
              </span>
              <span className="py-[7px] pr-[6px] text-[14px] font-normal italic text-main-bg">
                {!avatarName ? 'Добавить картинку' : validateImage.checkImgName(width, avatarName)}
              </span>
            </label>
          </div>
          <button
            disabled={disabled}
            className="mx-auto mt-[20px] block w-[100px] rounded-[6px]  bg-main-bg py-[6px] text-center text-[14px] font-bold text-main-color disabled:bg-gray-300 disabled:text-gray-500"
          >
            ОК
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewTaskForm;
