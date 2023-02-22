import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, handleLogin, handleLogout } from '../auth/auth-operations';
import {
  addChild,
  addGift,
  addTask,
  buyGift,
  changeTaskActiveStatus,
  changeTaskCompletedStatus,
  editGift,
  editTask,
  removeGift,
  removeTask,
} from './info-operations';
import { IChild, IInfoState } from '../../types/info-types';
import { getDay } from '../../services/helpers/date';

const initialState: IInfoState = {
  children: [] as IChild[],
  currentChild: {} as IChild,
  selectedDay: getDay(),
  isLoading: false,
  error: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setCurrentChild: (store, { payload }: PayloadAction<IChild>) => {
      store.currentChild = payload;
    },
    setSelectedDay: (store, { payload }: PayloadAction<string>) => {
      store.selectedDay = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.children = [...payload.children];
        store.currentChild = payload.children[0];
        store.isLoading = false;
      })

      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))
      .addCase(getUser.fulfilled, (store, { payload }) => {
        store.children = [...payload.children];
        store.isLoading = false;
      })
      .addCase(addChild.fulfilled, (store, { payload }) => {
        store.children = [...store.children, payload];
        store.currentChild = payload;
        store.isLoading = false;
      })

      .addCase(addTask.fulfilled, (store, { payload }) => {
        store.children = store.children.map(el =>
          el._id === payload.childId ? { ...el, tasks: [...el.tasks, payload] } : el
        );
        store.currentChild.tasks = [...store.currentChild.tasks, payload];
        store.isLoading = false;
      })

      .addCase(changeTaskActiveStatus.fulfilled, (store, { payload: { updatedTask, rewardsPlanned } }) => {
        store.children = store.children.map(child =>
          child._id === updatedTask.childId
            ? { ...child, tasks: child.tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)) }
            : child
        );
        store.currentChild.tasks = [...store.currentChild.tasks, updatedTask];
        store.currentChild.rewardsPlanned = rewardsPlanned;
        store.isLoading = false;
      })

      .addCase(changeTaskCompletedStatus.fulfilled, (store, { payload: { updatedTask, rewardsGained, balance } }) => {
        store.children = store.children.map(child =>
          child._id === updatedTask.childId
            ? {
                ...child,
                tasks: child.tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)),
                rewardsGained,
                balance,
              }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        );
        store.currentChild.rewardsGained = rewardsGained;
        store.currentChild.balance = balance;
        store.isLoading = false;
      })

      .addCase(editTask.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId
            ? { ...child, tasks: child.tasks.map(task => (task._id === payload._id ? payload : task)) }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.map(task => (task._id === payload._id ? payload : task));
        store.isLoading = false;
      })

      .addCase(removeTask.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId
            ? { ...child, tasks: child.tasks.filter(task => task._id !== payload.taskId) }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.filter(task => task._id !== payload.taskId);
        store.isLoading = false;
      })

      .addCase(addGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId ? { ...child, gift: [...child.gifts, payload] } : child
        );
        store.currentChild.gifts = [...store.currentChild.gifts, payload];
        store.isLoading = false;
      })

      .addCase(editGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId
            ? { ...child, gifts: child.gifts.map(gift => (gift._id === payload._id ? payload : gift)) }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.map(gift => (gift._id === payload._id ? payload : gift));
        store.isLoading = false;
      })

      .addCase(removeGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId
            ? { ...child, gifts: child.gifts.filter(gift => gift._id !== payload.giftId) }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.filter(gift => gift._id !== payload.giftId);
        store.isLoading = false;
      })

      .addCase(buyGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.purchasedGift.childId
            ? {
                ...child,
                gifts: child.gifts.map(gift => (gift._id === payload.purchasedGift._id ? payload.purchasedGift : gift)),
                balance: payload.updatedBalance,
              }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.map(gift =>
          gift._id === payload.purchasedGift._id ? payload.purchasedGift : gift
        );
        store.isLoading = false;
      })
      .addMatcher(isError, (store, action: PayloadAction<{ message: string }>) => {
        store.error = action.payload.message;
        store.isLoading = false;
      })
      .addMatcher(Loading, store => {
        store.error = null;
        store.isLoading = true;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function Loading(action: AnyAction) {
  return action.type.endsWith('pending');
}

export const { setCurrentChild, setSelectedDay } = infoSlice.actions;
export default infoSlice.reducer;
