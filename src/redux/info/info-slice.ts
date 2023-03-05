import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, handleLogin, handleLogout } from '../auth/auth-operations';
import {
  addChild,
  addGift,
  addTask,
  buyGifts,
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
  purchasedGifts: [],
  isLoading: false,
  error: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setCurrentChild: (store, { payload }: PayloadAction<IChild>) => {
      store.currentChild = payload;
      store.purchasedGifts = payload.gifts.filter(gift => gift.isPurchased).map(gift => gift._id);
    },
    setSelectedDay: (store, { payload }: PayloadAction<string>) => {
      store.selectedDay = payload;
    },
    togglePurchase: (store, { payload }: PayloadAction<string>) => {
      store.currentChild.gifts = store.currentChild.gifts.map(gift =>
        gift._id === payload ? { ...gift, isPurchased: !gift.isPurchased } : gift
      );
    },
    refreshPurchasedGifts: store => {
      store.purchasedGifts = store.currentChild?.gifts.filter(gift => gift.isPurchased).map(gift => gift._id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.children = [...payload.children];
        if (payload.children.length > 0) {
          store.currentChild = payload.children[0];
          store.purchasedGifts = payload.children[0].gifts.filter(gift => gift.isPurchased).map(gift => gift._id);
          // if (store.currentChild?._id) {
          //   const childIndex = payload.children.findIndex(child => child._id === store.currentChild._id);
          //   if (childIndex > -1) {
          //     store.currentChild = payload.children[childIndex];
          //     store.purchasedGifts = payload.children[childIndex].gifts
          //       .filter(gift => gift.isPurchased)
          //       .map(gift => gift._id);
          //   }
          // } else {
          //   store.currentChild = payload.children[0];
          //   store.purchasedGifts = payload.children[0].gifts.filter(gift => gift.isPurchased).map(gift => gift._id);
          // }
        }
      })

      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))
      .addCase(getUser.fulfilled, (store, { payload }) => {
        store.isLoading = false;
        store.children = [...payload.children];

        if (payload.children.length > 0) {
          store.currentChild = payload.children[0];
          store.purchasedGifts = payload.children[0].gifts.filter(gift => gift.isPurchased).map(gift => gift._id);
        }
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
            ? {
                ...child,
                tasks: child.tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)),
                rewardsPlanned,
              }
            : child
        );
        store.currentChild = store.children.find(child => child._id === updatedTask.childId)!;
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
          child._id === store.currentChild._id
            ? { ...child, tasks: child.tasks.filter(task => task._id !== payload) }
            : child
        );
        store.currentChild.tasks = store.currentChild.tasks.filter(task => task._id !== payload);
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
          child._id === store.currentChild._id
            ? { ...child, gifts: child.gifts.filter(gift => gift._id !== payload) }
            : child
        );
        store.currentChild.gifts = store.currentChild.gifts.filter(gift => gift._id !== payload);
        store.isLoading = false;
      })

      .addCase(buyGifts.fulfilled, (store, { payload }) => {
        store.children = store.children.map(child =>
          child._id === payload.childId
            ? {
                ...child,
                balance: payload.balance,
                gifts: payload.gifts,
              }
            : child
        );
        store.currentChild.balance = payload.balance;
        store.currentChild.gifts = payload.gifts;
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

export const { setCurrentChild, setSelectedDay, togglePurchase, refreshPurchasedGifts } = infoSlice.actions;
export default infoSlice.reducer;
