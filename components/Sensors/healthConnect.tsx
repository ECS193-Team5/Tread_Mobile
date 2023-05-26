import {
    View,
} from 'react-native';
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'
import axios from 'axios';
import { useState, useEffect } from "react";
import {
    initialize,
    requestPermission,
    readRecords,
    getGrantedPermissions,
    getSdkStatus,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';
import { HealthConnect } from "./exerciseNameConverstion.json";
import { reduceExercisesToUnique, sendExerciseList } from './sensorHelperFunctions';
import { Button } from 'react-native-elements';
import { getDateAnchor } from '../../routes/sensors';

const ListenerHealthSensor = (props) => {
    const [load, setLoad] = useState(false);
    const [sensorType, setSensorType] = useState("none");
    const [permissions, setPermissions] = useState(false);
    const [dataResults, setDataResults] = useState([]);

    useEffect(() => {
        if (!load && props.type === "Challenges") {
            checkSensorType();
            setLoad(true);
        }
        else {
            setLoad(true);
        }
    }, [load]);

    useEffect(() => {
        if (sensorType === "healthKit") {
            callPermissionsApple();
        }
        else if(sensorType === "healthConnect"){
            callPermissionsAndroid();
        }
    }, [sensorType])

    useEffect(() => {
        if (load && props.update) {
            props.setUpdate(false);
            if(permissions){
                readSampleData();
            }
        }
    }, [props.update]);

    useEffect(() => {
        if(dataResults){
            let exerciseList = [];
            if(sensorType === "healthConnect"){
                exerciseList = dataResults.map(convertWorkoutAndroid);
            }
            else if(sensorType === "healthKit"){
                exerciseList = dataResults.map(convertWorkoutApple);
            }
            let uniqueExerciseList = reduceExercisesToUnique(exerciseList);

            sendExerciseList(exerciseList, uniqueExerciseList, sensorType);
        }
    }, [dataResults]);

    const checkAndroidAvailability = async () => {
        try {
            const status = await getSdkStatus();
            if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
                setSensorType("healthConnect");
            }

            return false;
        }
        catch (error) {
            return false;
        }
    }

    const checkAppleAvailability = async () => {
        AppleHealthKit.isAvailable((err: Object, available: boolean) => {
            if (err) {
                return false;
            }
            setSensorType("healthKit");
        })
    }

    const checkSensorType = () => {
        checkAndroidAvailability();
        checkAppleAvailability();
    }

    const callPermissionsAndroid = async () => {
        try {
            const isInitialized = await initialize();

            const grantedPermissions = await requestPermission([
                { accessType: 'read', recordType: 'ExerciseSession' },
                { accessType: 'write', recordType: 'ExerciseSession' }
            ]);

            console.log(grantedPermissions);
        }
        catch (err) {
            console.log("Either this is not a HealthConnect compatible device, or the user did not give permissions");
        }
    }

    const callPermissionsApple = async () => {
        const permissions = {
            permissions: {
                read: [AppleHealthKit.Constants.Permissions.ActivitySummary,
                AppleHealthKit.Constants.Permissions.Workout,
                AppleHealthKit.Constants.Permissions.DistanceCycling,
                AppleHealthKit.Constants.Permissions.DistanceSwimming,
                AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                AppleHealthKit.Constants.Permissions.FlightsClimbed,
                AppleHealthKit.Constants.Permissions.StepCount,
                AppleHealthKit.Constants.Permissions.Steps],
                write: [AppleHealthKit.Constants.Permissions.ActivitySummary,
                AppleHealthKit.Constants.Permissions.Workout,
                AppleHealthKit.Constants.Permissions.DistanceCycling,
                AppleHealthKit.Constants.Permissions.DistanceSwimming,
                AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                AppleHealthKit.Constants.Permissions.FlightsClimbed,
                AppleHealthKit.Constants.Permissions.StepCount,
                AppleHealthKit.Constants.Permissions.Steps]

            },
        } as HealthKitPermissions;

        try {
            AppleHealthKit.getAuthStatus(permissions, (err, results) => {
                if (err) {
                    return false;
                }
                setPermissions(true);
            });
        }
        catch (err) {
            return false;
        }
    }

    const getLastMonth = () => {
        let today = Date.now();
        let thirtyDaysMilliseconds = 30*24*60*60*1000;
        let lastMonth =  new Date(today - thirtyDaysMilliseconds);
        return lastMonth.toISOString();
    }

    const getExercisesAndroid = async (data) => {
        let lastModifiedDate = getLastMonth();
        let endString = new Date().toISOString();

        if (data.healthConnectLastModifiedDate){
            lastModifiedDate = data.healthConnectLastModifiedDate.toISOString();
        }

        const result = await readRecords('ExerciseSession', {
            timeRangeFilter: {
                operator: 'between',
                startTime: lastModifiedDate,
                endTime: endString,
            },
        });

        setDataResults(result);
    }

    const getExercisesApple = async (data) => {
        let startDate = getEarliestDate();
        let endDate = new Date().toISOString();
        let anchor = "";

        if (data.healthKitAnchor.length === ""){
            anchor = data.healthKitAnchor;
        }


        let options = {
            startDate: (new Date(2016,4,27)).toISOString(), //
            endDate: (new Date()).toISOString(),
            type: 'Workout'
          };

        let allResults = [];

        AppleHealthKit.getAnchoredWorkouts(options, (err: Object, results: AnchoredQueryResults) => {
            if (err) {
              return;
            }
            console.log(results.data)
            console.log(results.anchor)
        });

        //TODO
        /*
        AppleHealthKit.getSamples(
            options,
            (callbackError: string, results: HealthValue[]) => {
                if(callbackError){
                    return;
                }
                results.forEach((item) => {allResults.push(convertWorkoutTime(item))} )
                results.forEach((item) => {
                    let result = convertWorkoutDistance(item);

                    if (result.exercise.amount >  0){
                        allResults.push(result)
                    }
                });

                let uniqueExerciseList = reduceExercisesToUnique(allResults);
                sendExerciseList(allResults, uniqueExerciseList, "healthKit");
            },
        );*/
    }

    const readSampleData = async () => {
        if(!permissions){
            return;
        }

        if(sensorType === "healthConnect"){
            getLastReadDate(sensorType, getExercisesAndroid);
        }
        else if(sensorType === "healthKit"){
            getLastReadDate(sensorType, getExercisesApple);
        }
    }

    /*
    const readGrantedPermissions = () => {
        try{
        getGrantedPermissions().then((permissions) => {
            console.log('Granted permissions ', { permissions });
        });
    }
    catch(error){
        console.log("Error - Either HealthConnect failed or this is an Apple Device");
    }
    };





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
    */


    return (<View></View>);
}
export default ListenerHealthSensor;
