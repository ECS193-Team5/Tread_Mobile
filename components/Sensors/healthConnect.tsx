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
import {ANDROID_CLIENT, WEB_CLIENT, IOS_CLIENT, BACKEND_URL, VAPID_KEY} from '@env';
import {HealthConnect} from "./exerciseNameConverstion.json";
import {reduceExercisesToUnique, sendExerciseList } from './sensorHelperFunctions';

const ListenerComponentHealthConnect = () => {
    const [load, setLoad] = useState(false);
    const [dataResults, setDataResults] = useState([]);

    useEffect(() => {
        if(!load){
            readSampleData();
            setLoad(true);
        }
    });

    useEffect(() => {
        if(dataResults){
            let exerciseList = dataResults.map(convertWorkoutTime);
            let uniqueExerciseList = reduceExercisesToUnique(exerciseList);

            sendExerciseList(exerciseList, uniqueExerciseList, "healtConnect");
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
            url: 'https://tread-backend-wvh22rj5mq-uw.a.run.app/data_origin/get_origin_last_import_date',
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
                if (response.data.healthConnectLastPostedDate){
                    timeString = response.data.healthConnectLastPostedDate;
                }
                console.log(timeString);

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
                console.log(error);
                return;
            });
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
    }


    return (<View></View>);
}
export default ListenerComponentHealthConnect;
