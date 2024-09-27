export const requireField = message => {
  return {required: message};
};

export const validateMinLengthText = (length = 6, message) => {
  return {minLength: {value: length, message}, required: message};
};

export const confirmField = (text, message) => {
  return {validate: value => value === text || message};
};

export const validateExist = (text, message) => {
  return {validate: value => value !== text || message};
};

export const validateEmail = message => {
  return {
    required: message,
    pattern: {value: /^[a-zA-Z0-9.]+@gmail\.com$/, message},
  };
};

const regexHttp =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const validateHttp = (message, required = true) => {
  return {
    required: required ? message : false,
    pattern: {value: regexHttp, message},
  };
};

export const validateMinMaxAmount = (message, amount, minAmount) => {
  return {
    min: {
      value: minAmount || 1,
      message: message,
    },
    max: {
      value: amount,
      message: message,
    },
    pattern: {
      value: /^[0-9]*$/,
      message: 'Value must be a valid number',
    },
    required: message,
  };
};
