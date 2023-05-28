import {
    View,
} from 'react-native';
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'
import { useState, useEffect } from "react";
import {
    initialize,
    requestPermission,
    readRecords,
    getGrantedPermissions,
    getSdkStatus,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';
import { HealthConnect, HealthKit } from "./exerciseNameConverstion.json";
import { getDateAnchor, sendExerciseList } from '../../routes/sensors';
import { unitTypes } from "./exerciseNameConverstion.json";

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
        else if(!load) {
            setLoad(true);
        }
    }, [load]);

    useEffect(() => {
        if (sensorType === "healthKit" && !permissions) {
            callPermissionsApple();
        }
        else if(sensorType === "healthConnect"){
            callPermissionsAndroid();
        }
    }, [sensorType])

    useEffect(() => {
        if (load && props.update) {
            if(permissions){
                readSampleData();
            }
            props.setUpdate(false);
        }
    }, [props.update]);

    useEffect(() => {
        if(dataResults.length > 0 && dataResults[0].length > 0){
            let exerciseList = [];

            if(sensorType === "healthConnect"){
                exerciseList = dataResults[0].map(convertWorkoutAndroid);
            }
            else if(sensorType === "healthKit"){
                
                exerciseList = dataResults[0].map(convertWorkoutTimeApple);


                dataResults[0].forEach((item) => {
                    let result = convertWorkoutDistanceApple(item);
                    if (result.exercise.amount >  0){
                        exerciseList.push(result)
                    }
                });

            }
            
            let uniqueExerciseList = reduceExercisesToUnique(exerciseList);

            let data = {
                exerciseList: exerciseList,
                uniqueExercises: uniqueExerciseList,
                dataOrigin: sensorType,
                anchor: dataResults[1]
            }
            
            sendExerciseList(data, props.refreshPage);
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
                console.log(err);
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

            if(grantedPermissions.length > 0){
                setPermissions(true);
            }
        }
        catch (err) {
            console.log("Either this is not a HealthConnect compatible device, or the user did not give permissions");
        }
    }

    const callPermissionsApple = async () => {
        const permissions = {
            permissions: {
                read: [
                AppleHealthKit.Constants.Permissions.Workout,
                ],
                write: [
                AppleHealthKit.Constants.Permissions.Workout,
                ],
            }
            } as HealthKitPermissions

        try {
            AppleHealthKit.getAuthStatus(permissions, (err, results) => {
                if (err) {
                    console.log(err);
                    return false;
                }
                setPermissions(true);
            });
        }
        catch (err) {
            console.log(err);
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
         
        let startString = getLastMonth();
        let endString = new Date().toISOString();

        const result = await readRecords('ExerciseSession', {
            timeRangeFilter: {
                operator: 'between',
                startTime: startString,
                endTime: endString,
            },
        });


        let lastModifiedDate = Date.parse(getLastMonth());

        if (data && data.healthConnectAnchor){
            lastModifiedDate = Date.parse(data.healthConnectAnchor);
        }


        let realExerciseList = [];

        result.forEach((exercise) =>{
            let exerciseTimeInMilliseconds = Date.parse(exercise.metadata.lastModifiedTime);
            if (exerciseTimeInMilliseconds > lastModifiedDate){
                lastModifiedDate = exerciseTimeInMilliseconds;
                realExerciseList.push(exercise);
            }
        })

        let newLastModifiedDate = lastModifiedDate;

        setDataResults([realExerciseList, newLastModifiedDate]);
    }

    const getExercisesApple = async (data) => {
        
        let anchor = "";
        if(data && data.healthKitAnchor){
            anchor = data.healthKitAnchor;
        } 

        let options = {
            type: 'Workout'
        };

        if(anchor.length>0){
            options["anchor"] = anchor;
        }
        
        AppleHealthKit.getAnchoredWorkouts(options, (err: Object, results: AnchoredQueryResults) => {
            if (err) {
                console.log(err);
              return;
            }

            let data = results.data;
            let newAnchor  = results.anchor;
            setDataResults([data, newAnchor]);
        });
    }

    const readSampleData = async () => {
        if(!permissions){
            return;
        }

        if(sensorType === "healthConnect"){
            getDateAnchor(sensorType, getExercisesAndroid);
        }
        else if(sensorType === "healthKit"){
            getDateAnchor(sensorType, getExercisesApple);
        }
    }

    const convertWorkoutAndroid = (workout) => {

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

    const convertWorkoutDistanceApple = (workoutData) => {
        let name = HealthKit[workoutData.activityName];
        let start = Date.parse(workoutData.start);

        return ({
            loggedDate: start,
            exercise: {
                exerciseName: name,
                amount: workoutData.distance,
                unit: "mi"
            }
        });

    }

    const convertWorkoutTimeApple = (workoutData) => {
        let name = HealthKit[workoutData.activityName];
        let start = Date.parse(workoutData.start);
        let end = Date.parse(workoutData.end);
        let timeMin = (end-start)/(1000*60);
        return ({
            loggedDate: start,
            exercise: {
                exerciseName: name,
                amount:timeMin,
                unit: "min"
            }
        });
    }

    const calculateUnitType = (unit) => {
        if (unitTypes["distance"].includes(unit)){
            return "distance";
        }
        else if (unitTypes["time"].includes(unit)){
            return "time";
        }
        return "count";
    }

    const reduceExercisesToUnique = (exerciseList) => {
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

    return (<View></View>);
}
export default ListenerHealthSensor;
