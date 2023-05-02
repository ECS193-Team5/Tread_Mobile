import {
    View,
} from 'react-native';
import axios from 'axios';
import {useState, useEffect} from "react";
import {
    initialize,
    requestPermission,
    readRecords,
    getGrantedPermissions,
    getSdkStatus,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';
import {BACKEND_URL} from '@env';
import {HealthConnect, unitTypes} from "./exerciseNameConverstion.json";

const ListenerComponentHealthConnect = () => {
    const [load, setLoad] = useState(false);
    const [dataResults, setDataResults] = useState([]);

    const calculateUnitType = (unit) => {
        if (unitTypes["distance"].includes(unit)){
            return "distance";
        }
        else if (unitTypes["time"].includes(unit)){
            return "time";
        }
        return "count";
    }

    useEffect(() => {
        if(!load){
            readSampleData();
            setLoad(true);
        }
    });


    useEffect(() => {
        if(dataResults){
            let exerciseList = dataResults.map(convertWorkoutTime);
            let uniqueExerciseList = calculateExercises(exerciseList);

            sendExerciseList(exerciseList, uniqueExerciseList);
        }
    }, [dataResults]);


    const readGrantedPermissions = () => {
        getGrantedPermissions().then((permissions) => {
            console.log('Granted permissions ', { permissions });
        });
    };

    const checkAvailability = async () => {

        const status = await getSdkStatus();
        if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
            console.log('SDK is available');
            return true;
        }

        if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
            console.log('SDK is not available');
            return false;
        }

        if (
            status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
        ) {
            console.log('SDK is not available, provider update required');
            return false;
        }
    }

    const getLastReadDate = async () => {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'data_origin/get_origin_last_import_date',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
            data:{
                dataOrigin:"healthConnect"
            }
          };

          axios(config)
            .then(async (response) => {
                let timeString = new Date(0).toISOString();
                if (response.data !== null){
                    timeString = response.data;
                }

                const result = await readRecords('ExerciseSession', {
                    timeRangeFilter: {
                        operator: 'between',
                        startTime: timeString,
                        endTime: '2023-08-09T23:53:15.405Z',
                    },
                });
                setDataResults(result);


            })
            .catch(function (error) {
                console.log("get last read date failed");
                return;
            });
    }

    const calculateExercises = (exerciseList) => {
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

    const convertWorkoutTime = (workout) => {

        let name = "";

        if (workout.exerciseType === 0){
            name = workout.title;
        }
        else{
            name = HealthConnect[workout.exerciseType]
        }

        let start = Date.parse(workout.startTime);
        let end = Date.parse(workout.endTime);
        let timeMin = (end-start)/(1000*60);
        return ({
                loggedDate: start,
                exercise: {
                    unit: "min",
                    amount: timeMin,
                    exerciseName: name
                }
        });

    }


    const sendExerciseList = (exerciseList, uniqueExercises) => {
        console.log({
            exerciseList: exerciseList,
            uniqueExercises: uniqueExercises,
            dataOrigin: "healthConnect"
        });
        var config = {
            method: 'post',
            url: BACKEND_URL + 'exercise_log/add_exercise_list',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
            data:{
                exerciseList: exerciseList,
                uniqueExercises: uniqueExercises,
                dataOrigin: "healthConnect"
            }
          };

          axios(config)
            .then((response) => {
                console.log("Successfully sent exercises")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const readSampleData = async () => {
        // Intialize the Client
        const isInitialized = await initialize();

        const grantedPermissions = await requestPermission([
            { accessType: 'read', recordType: 'ExerciseSession' },
            { accessType: 'write', recordType: 'ExerciseSession' }
        ]);

        readGrantedPermissions();

        let res = await checkAvailability();

        if (!res){
            return;
        }

        await getLastReadDate();

        //sendExerciseList(exerciseList);
    }

    return (<View></View>);
}
export default ListenerComponentHealthConnect;
