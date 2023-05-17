import {BACKEND_URL} from '@env';

const loginConfig = function(authToken, deviceToken) {
  var config = {
    method: 'post',
    url: BACKEND_URL + 'auth/login/google',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': authToken,
      Accept: 'application/json',
    },
    data: {
      'deviceToken': deviceToken
    }
  };

  return config;
}

export default loginConfig;