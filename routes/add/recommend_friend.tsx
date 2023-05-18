import {BACKEND_URL} from '@env';

const getReccFriend = function() {
  var config = {
    method: 'post',
    url: BACKEND_URL + 'friend_list/get_recommended',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    }
  };

  return config;
}

export default getReccFriend;