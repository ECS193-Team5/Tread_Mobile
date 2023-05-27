import axios from "axios";

export function getDateAnchor (dataOrigin, thenFunc)  {
    var config = {
        method: 'post',
        url: 'https://tread-backend-wvh22rj5mq-uw.a.run.app/data_origin/get_origin_anchor',
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
          console.log("fail in get date");
            return
        });
}

export const sendExerciseList = (data, refreshFunc) => {
  if (data.exerciseList.length === 0 || data.uniqueExerciseList === 0){
    console.log("return before doing te thing")
      return;
  }

  var config = {
      method: 'post',
      url: 'https://tread-backend-wvh22rj5mq-uw.a.run.app/exercise_log/add_exercise_list',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      data: data
    };

    axios(config)
      .then((response) => {
        console.log("response");
          refreshFunc();
      })
      .catch(function (error) {
        console.log(error);
        console.log("fail in sendExerciseList")

      });
}