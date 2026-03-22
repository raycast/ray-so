import localforage from "localforage";
import { createJSONStorage } from "jotai/utils";

export const createStorage = <T>(options: LocalForageOptions) => {
  localforage.config(options);

  return createJSONStorage<T>(() => ({
    getItem: async (key: string) => {
      return await localforage.getItem(key);
    },

    setItem: async (key: string, value: unknown) => {
      await localforage.setItem(key, value);
    },

    removeItem: async (key: string) => {
      await localforage.removeItem(key);
    },
  }));
};
