import { createContext, useContext } from 'react';
import { RootStore } from '@src/store/RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;

export const useStore = (): RootStore => {
  const store = useContext<RootStore>(StoreContext);
  if (store === null) {
    throw new Error('useStore should be used inside StoreContext.');
  }
  return store;
};

export const store = new RootStore();
