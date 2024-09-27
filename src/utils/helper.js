import {showMessage} from 'react-native-flash-message';
import {MessageStyle} from '../assets';
export const showMess = (message, type = 'success') => {
  if (type === 'success') {
    return showMessage({
      message,
      ...MessageStyle.success,
    });
  }
  if (type === 'warning') {
    return showMessage({
      message,
      ...MessageStyle.warning,
    });
  }
  return showMessage({
    message,
    ...MessageStyle.error,
  });
};
export const secondsToStringTime = seconds => {
  return new Date(seconds * 3000).toISOString().substring(11, 8).split(':');
};
