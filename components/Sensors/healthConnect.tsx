import {
    View,
} from 'react-native';
import axios from 'axios';
import {useEffect} from "react";
import {
    initialize,
    requestPermission,
    readRecords,
    getGrantedPermissions,
    getSdkStatus,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';
import {BACKEND_URL} from '@env';
import {HealthConnect} from "./exerciseNameConverstion.json";
const ListenerComponentHealthConnect = () => {
    try{
    useEffect(() => {
        readSampleData();
    });

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
            url: BACKEND_URL + 'sensors/get_sensor_date',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
            data:{
                sensorType:"HealthConnect"
            }
          };

          axios(config)
            .then((response) => {
                return new Date(response.data).toISOString()
            })
            .catch(function (error) {
                return new Date().toISOString();
            });
    }


    const convertWorkout = (workout) => {

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
                unit: "min",
                amount: timeMin,
                exerciseName: name
        });

    }

    const sendExerciseList = (result) => {
        var config = {
            method: 'post',
            url: BACKEND_URL + 'sensors/add_exercise_list',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
            data:{
                exerciseList: result
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

        const startTimeString = new Date(1672534861000).toISOString();//await getLastReadDate();

        const result = await readRecords('ExerciseSession', {
            timeRangeFilter: {
                operator: 'between',
                startTime: startTimeString,
                endTime: '2023-08-09T23:53:15.405Z',
            },
        });
        let exerciseList = result.map(convertWorkout)
        sendExerciseList(exerciseList);
    }}
    catch(error){
        console.log("HealthConnect cannot be used. This is either a device that does not support HealthConnect or something has gone wrong.")
    }
    return (<View></View>);
}
export default ListenerComponentHealthConnect;
