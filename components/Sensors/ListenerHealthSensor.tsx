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
import { HealthConnect } from "./exerciseNameConverstion.json";
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
        if(dataResults.length > 0){
            let exerciseList = [];
            if(sensorType === "healthConnect"){
                exerciseList = dataResults[0].map(convertWorkoutAndroid);
            }
            else if(sensorType === "healthKit"){
                let exerciseList = dataResults[0].map(convertWorkoutTimeApple);


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
        console.log("check Apple availability  was called");
        AppleHealthKit.isAvailable((err: Object, available: boolean) => {
            if (err) {
                console.log("err  in  apple health kit  availability");
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
        console.log("apple persmissions  were called");

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
                    console.log(err, "console log no permission?");
                    return false;
                }
                console.log("got apple permissions")
                setPermissions(true);
            });
        }
        catch (err) {
            console.log(err, "fail the try?")
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
        console.log("I  would start getting exercises basedon ", data);
        /*let startDate = getEarliestDate();
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
        });*/

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

        /*    useEffect(() => {
        if(props.update){
            props.setUpdate(false);
        try{

        })

        pullSamples();
        }
        catch(err){
            console.log("Error in HealthKit - Either this is not an apple device or permissions was not given");
        }
    }
    }, [props.update]);



        function getMostRecentDateRead(){
            var config = {
                method: 'post',
                url: 'https://tread-backend-wvh22rj5mq-uw.a.run.app/data_origin/get_origin_last_import_date',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                },
                data:{
                    dataOrigin:"healthKit"
                }
              };

              axios(config)
                .then(async (response) => {
                    let startDate = new Date(0).toISOString();
                    if (response.data.healthConnectLastPostedDate){
                        startDate = response.data.healthConnectLastPostedDate;
                    }


                    let options = createOptionsList(startDate);

                    let allResults = [];

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
                    );


                })
                .catch(function (error) {
                    return;
                });

        }



        return (<View></View>)
    }*/
        //setDataResults([results, anchor]);
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
