import axios from 'axios';

const baseUrl = 'https://799e15882c89.ngrok.io/';

const signUpUrl = baseUrl + 'register';
const signInUrl = baseUrl + 'DeveloperSignin';

export const apiService = {
  signUp: (requestBody, callBack, method, isSecure) => {
    request(signUpUrl, requestBody, callBack, method, isSecure);
  },
  signIn: (requestBody, callBack, method, isSecure) => {
    request(signInUrl, requestBody, callBack, method, isSecure);
  },
};

const request = (url, body, callBack, method, isSecure = false) => {
  axios({
    method,
    url,
    data: body,
  })
    .then((res) => {
      callBack(res);
    })
    .catch((e) => {
      callBack(e);
    });
};
