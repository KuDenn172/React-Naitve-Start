import { API_URL } from '@env';
import axios from 'axios';
import useDialog from '~/hooks/useDialog';
import { useAuthStore } from '../hooks/stores/useAuthStore';

export const instance = axios.create({
  baseURL: API_URL + '/user',
});


instance.interceptors.request.use(
  async config => {
    const state = useAuthStore.getState();
    const token = state.token;
    // const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    // const token = storedToken && JSON.parse(storedToken).token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

let countErr401 = 0;

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      ++countErr401;
      const { openDialog } = useDialog.getState();
      const { clearToken } = useAuthStore.getState();

      countErr401 >= 2 &&
        openDialog({
          title: 'Session Expired',
          desc: 'Your login session has expired. Please sign in again.',
          textBtnOne: 'Sign Out',
          noClose: true,
          noGoBack: true,
          onConfirm: () => {
            console.log('OK');
            clearToken();
            countErr401 = 0;
          },
        });
      console.log('countErr401', countErr401);
    }
    return Promise.reject(error);
  },
);
