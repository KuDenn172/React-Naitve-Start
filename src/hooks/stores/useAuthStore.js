import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {create} from 'zustand';
import {instance} from '../../api/auth';
import {useQueryClient} from '@tanstack/react-query';

export const TOKEN_KEY = 'token';

export const useAuthStore = create((set, get) => {
  const {getItem, setItem, removeItem} = useAsyncStorage(TOKEN_KEY);

  return {
    data: null,
    token: null,
    saveToken: async (value, noSave) => {
      const accessToken = value?.token;

      if (accessToken) {
        // Update the default headers
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        !noSave && (await setItem(JSON.stringify(value)));

        set({
          token: value?.token,
          data: value,
        });
      }
    },

    startToken: async () => {
      const dataJson = await getItem();
      const data = JSON.parse(dataJson);

      if (data) {
        get()?.saveToken(data, true);
      }
    },

    clearToken: async () => {
      removeItem();
      delete axios.defaults.headers.common.Authorization;
      delete instance.defaults.headers.common.Authorization;

      set({
        token: null,
        data: null,
      });
    },
  };
});
