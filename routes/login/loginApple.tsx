import {BACKEND_URL} from '@env';

const loginConfigApple = function(authToken, deviceToken, nonce, fullName) {
  var config = {
    method: 'post',
    url: BACKEND_URL + 'auth/login/apple',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': authToken,
      Accept: 'application/json',
    },
    data: {
      deviceToken: deviceToken,
      nonce : nonce,
      fullName : fullName
    }
  };

  return config;
}

export default loginConfigApple
