import {BACKEND_URL} from '@env';

const loginConfigApple = function(authToken, deviceToken, nonce, fullName) {
  console.log("Auth token is", authToken);
  console.log("device token is", deviceToken);
  console.log("Nonce is ", nonce);
  console.log("Full name", fullName);
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
