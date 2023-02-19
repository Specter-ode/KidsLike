import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, handleLogin } from '../auth/auth-operations';
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
import { IChild, IInfoState, IResponseError } from '../../types/info-types';

const initialState: IInfoState = {
  children: [] as IChild[],
  currentChild: {} as IChild,
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
  },
  extraReducers: builder => {
    builder
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.children = [...payload.children];
        store.isLoading = false;
      })
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
          el.id === payload.childId ? { ...el, tasks: [...el.tasks, payload] } : el
        );
        store.currentChild.tasks = [...store.currentChild.tasks, payload];
        store.isLoading = false;
      })

      .addCase(changeTaskActiveStatus.fulfilled, (store, { payload: { updatedTask, rewardsPlanned } }) => {
        store.children = store.children.map(child =>
          child.id === updatedTask.childId
            ? { ...child, tasks: child.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)) }
            : child
        );
        store.currentChild.tasks = [...store.currentChild.tasks, updatedTask];
        store.currentChild.rewardsPlanned = rewardsPlanned;
        store.isLoading = false;
      })

      .addCase(changeTaskCompletedStatus.fulfilled, (store, { payload: { updatedTask, rewardsGained, balance } }) => {
        store.children = store.children.map(child =>
          child.id === updatedTask.childId
            ? {
                ...child,
                tasks: child.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
                rewardsGained,
                balance,
              }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
        store.currentChild.rewardsGained = rewardsGained;
        store.currentChild.balance = balance;
        store.isLoading = false;
      })

      .addCase(editTask.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.childId
            ? { ...child, tasks: child.tasks.map(task => (task.id === payload.id ? payload : task)) }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.map(task => (task.id === payload.id ? payload : task));
        store.isLoading = false;
      })

      .addCase(removeTask.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.childId
            ? { ...child, tasks: child.tasks.filter(task => task.id !== payload.taskId) }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.filter(task => task.id !== payload.taskId);
        store.isLoading = false;
      })

      .addCase(addGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.childId ? { ...child, gift: [...child.gifts, payload] } : child
        );
        store.currentChild.gifts = [...store.currentChild.gifts, payload];
        store.isLoading = false;
      })

      .addCase(editGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.childId
            ? { ...child, gifts: child.gifts.map(gift => (gift.id === payload.id ? payload : gift)) }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.map(gift => (gift.id === payload.id ? payload : gift));
        store.isLoading = false;
      })

      .addCase(removeGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.childId
            ? { ...child, gifts: child.gifts.filter(gift => gift.id !== payload.giftId) }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.filter(gift => gift.id !== payload.giftId);
        store.isLoading = false;
      })

      .addCase(buyGift.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child.id === payload.purchasedGift.childId
            ? {
                ...child,
                gifts: child.gifts.map(gift => (gift.id === payload.purchasedGift.id ? payload.purchasedGift : gift)),
                balance: payload.updatedBalance,
              }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.map(gift =>
          gift.id === payload.purchasedGift.id ? payload.purchasedGift : gift
        );
        store.isLoading = false;
      })
      .addMatcher(isError, (store, action: PayloadAction<IResponseError>) => {
        store.error = action.payload.response.data.message;
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

export const { setCurrentChild } = infoSlice.actions;
export default infoSlice.reducer;
