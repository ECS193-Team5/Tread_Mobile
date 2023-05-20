import {BACKEND_URL} from '@env';

const signupConfig = function(userName, displayName, picture, deviceToken) {
  var config = {
    method: 'post',
    url: BACKEND_URL + 'sign_up/sign_up',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    data: {
      'username' : userName,
      'displayName' : displayName,
      'picture' : picture,
      'deviceToken' : deviceToken
    }
  };

  return config;
}

export default signupConfig;