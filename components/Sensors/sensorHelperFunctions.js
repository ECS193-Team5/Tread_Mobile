import { unitTypes } from "./exerciseNameConverstion.json";

import axios from 'axios';
const calculateUnitType = (unit) => {
    if (unitTypes["distance"].includes(unit)){
        return "distance";
    }
    else if (unitTypes["time"].includes(unit)){
        return "time";
    }
    return "count";
}

export const reduceExercisesToUnique = (exerciseList) => {
    let exercisesUnique = {};
    let uniqueExerciseList = [];
    exerciseList.forEach(element => {
        let exerciseName = element.exercise.exerciseName;
        let unitType = calculateUnitType(element.exercise.unit);

        if (!(exerciseName in exercisesUnique)){
            exercisesUnique[exerciseName] = new Set();
        }
        if(!exercisesUnique[exerciseName].has(unitType)){
            exercisesUnique[exerciseName].add(unitType);
            uniqueExerciseList.push({"exerciseName":exerciseName, "unitType":unitType});
        }
    });

    return uniqueExerciseList;
}

export const sendExerciseList = (exerciseList, uniqueExercises, dataOrigin) => {
    if (exerciseList.length === 0){
        console.log("No exercises to update");
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
        data:{
            exerciseList: exerciseList,
            uniqueExercises: uniqueExercises,
            dataOrigin: dataOrigin
        }
      };

      axios(config)
        .then((response) => {
            console.log("Successfully sent exercises", exerciseList)
        })
        .catch(function (error) {
            console.log(error);
        });
}