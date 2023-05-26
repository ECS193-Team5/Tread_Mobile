import axios from "axios";

export function getDateAnchor (dataOrigin, thenFunc)  {
    var config = {
        method: 'post',
        url: 'https://tread-backend-wvh22rj5mq-uw.a.run.app/data_origin/get_origin_last_import_date',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
        data:{
            dataOrigin: dataOrigin
        }
      };

      axios(config)
        .then(async (response) => {
            thenFunc(response.data);
        })
        .catch(function (error) {
            return
        });
}
