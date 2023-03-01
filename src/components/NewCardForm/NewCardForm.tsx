import addtask from '../../assets/img/addTask.jpg';
import sprite from '../../assets/icons/sprite.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFormModalStatus } from '../../redux/auth/auth-slice';
import { useEffect, useState } from 'react';
import * as validateImage from '../../services/helpers/validateImage';
import { toast } from 'react-toastify';
import useWindowDimensions from '../../services/hooks/useDimensions';
import { useLocation } from 'react-router-dom';
import { addGift, addTask, editGift, editTask } from '../../redux/info/info-operations';
interface IState {
  title: string;
  reward: number | '';
  avatar: File | null;
}

interface IGift {
  _id: string;
  title: string;
  price: number;
}

interface ITask {
  _id: string;
  title: string;
  reward: number;
}
interface IProps {
  task?: ITask;
  gift?: IGift;
  onCloseModal?: () => void;
}
const initialState = {
  title: '',
  reward: '',
  avatar: null,
};

const NewCardForm: React.FC<IProps> = ({ task, gift, onCloseModal }) => {
  const { pathname } = useLocation();
  const awardsPagePath = pathname === '/awards' || pathname === '/awards/*';
  const { width } = useWindowDimensions();
  const [state, setState] = useState(initialState as IState); // state формы, который мы отправляем при onSubmit
  console.log('state: ', state);
  const [avatarName, setAvatarName] = useState(''); // название файла, необходимо для рендера в custom file input
  const { currentChild } = useAppSelector(store => store.info);
  const dispatch = useAppDispatch();
  const { title, reward, avatar } = state;

  useEffect(() => {
    if (task) {
      setState({ title: task.title, reward: task.reward, avatar: null });
    }
    if (gift) {
      setState({ title: gift.title, reward: gift.price, avatar: null });
    }
  }, [task, gift]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    const newValue = () => {
      if (type === 'number') {
        console.log('value: ', value);
        console.log('typeof value: ', typeof value);
        console.log('Math.round(Number(value): ', Math.round(Number(value)));
        console.log('typeof Math.round(Number(value): ', typeof Math.round(Number(value)));

        return Math.round(Number(value));
      }
      return value;
    };
    setState(prevState => ({
      ...prevState,
      [name]: newValue(),
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const avatarFile = files[0];
      if (files.length === 0) {
        setAvatarName('');
        return;
      }
      if (validateImage.typeError(avatarFile)) {
        // валидация по типу файла
        toast.error("Картинка должна соответствоват одному из форматов: '.jpg', '.jpeg', '.gif', '.png'");
        return;
      }
      if (validateImage.maxAllowedSizeError(avatarFile)) {
        // валидация по размеру МБ
        toast.error('Размер файла должен быть меньше 1 Мб');
        return;
      }
      // валидация по ширине и высоте
      const reader = new FileReader();
      reader.onload = e => {
        const image = new Image();
        image.onload = () => {
          if (image.width <= 500 && image.height <= 500) {
            setState(prevState => ({
              ...prevState,
              avatar: avatarFile,
            }));
            setAvatarName(avatarFile.name);
          } else {
            toast.error('Image size should be less than 500px');
          }
        };
        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(avatarFile);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof reward !== 'number') return;
    if (awardsPagePath) {
      if (gift) {
        dispatch(editGift({ data: { title, price: reward, avatar }, giftId: gift._id }));
        if (onCloseModal) {
          onCloseModal();
        }
      } else {
        dispatch(setFormModalStatus(false));
        dispatch(addGift({ data: { title, price: reward, avatar }, childId: currentChild._id }));
      }
    } else {
      if (task) {
        const currentTask = currentChild.tasks.find(el => el._id === task._id);
        const isCurrentTaskWasCompleted = currentTask?.days.find(day => day.isCompleted);
        if (isCurrentTaskWasCompleted) {
          toast.error('Это задание уже было выполнено на этой недели. Редактирование невозможно');
          return;
        }
        dispatch(editTask({ data: { title, reward, avatar }, taskId: task._id }));
        if (onCloseModal) {
          onCloseModal();
        }
      } else {
        dispatch(setFormModalStatus(false));
        dispatch(addTask({ data: { title, reward, avatar }, childId: currentChild._id }));
      }
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
                placeholder={awardsPagePath ? 'Добавить подарок...' : 'Добавить задание...'}
                type="text"
                maxLength={50}
                minLength={3}
                onChange={handleChange}
                className="w-full border-b border-main-bg bg-transparent py-[7px] pl-[28px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:not-italic  placeholder:text-main-bg"
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
                placeholder={awardsPagePath ? 'Добавить цену...' : 'Добавить баллы...'}
                type="number"
                onChange={handleChange}
                className="w-full border-b border-main-bg  bg-transparent py-[7px] pl-[28px] pr-[6px] text-[14px] font-normal italic text-main-bg outline-none placeholder:not-italic placeholder:text-main-bg"
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
                onChange={handleImageChange}
                className="absolute left-0 top-0 h-[36px] w-full opacity-0"
              />
              <span className="mr-[11px] flex items-center">
                <svg width="21" height="19" className="fill-main-bg">
                  <use href={sprite + '#image'}></use>
                </svg>
              </span>
              {avatarName ? (
                <span className="py-[7px] pr-[6px] text-[14px] font-normal italic text-main-bg">
                  {validateImage.checkImgName(width, avatarName)}
                </span>
              ) : (
                <span className="py-[7px] pr-[6px] text-[14px] font-normal italic text-main-bg">
                  Добавить картинку...
                </span>
              )}
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
export default NewCardForm;
