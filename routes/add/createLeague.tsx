import {BACKEND_URL} from '@env';

const createLeague = function(leagueName, leagueDesc, security, picture) {
  var config = {
    method: 'post',
    url: BACKEND_URL + 'league/create_league',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    data: {
      'leagueName': leagueName,
      'leagueDescription': leagueDesc,
      'leagueType': security,
      'leaguePicture': picture
    }
  };

  return config;
}

export default createLeague;