
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'
import { NativeEventEmitter, NativeModules } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import {
    View,
     } from 'react-native';
import {HealthKit} from "./exerciseNameConverstion.json";
import { BACKEND_URL } from '@env';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { reduceExercisesToUnique, sendExerciseList } from './sensorHelperFunctions';

const ListenerComponentHealthKit = (props) =>{
    useEffect(() => {


        if(props.update){
            props.setUpdate(false);
        try{
        AppleHealthKit.isAvailable((err: Object, available: boolean) => {
            if (err) {
                throw err;
            }
        })

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Cycling:new',
            async () => {
                pullSamples();
            },
        );

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Running:new',
            async () => {
                pullSamples();
            },
        );

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:StairClimbing:new',
            async () => {
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Swimming:new',
            async () => {
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Walking:new',
            async () => {
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Workout:new',
            async () => {
                pullSamples();
            },
        );
        pullSamples();
        }
        catch(err){
            console.log("Error in HealthKit - Either this is not an apple device or permissions was not given");
        }
    }
    }, [props.update]);

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

        try{
        AppleHealthKit.getAuthStatus(permissions, (err, results) => {
            if (err){
                throw err
            }
        });
        }
        catch(err){
            console.log("Error in HealthKit - Either this is not an apple device or permissions was not given");
        }

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

        function createOptionsList(startDate: Int32){
            return(
                    {
                        startDate: new Date(startDate).toISOString(),
                        endDate: new Date().toISOString(),
                        type: "Workout"
                    }
                );
        }

        function convertWorkoutTime(workoutData){
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

        function convertWorkoutDistance(workoutData){
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


        function pullSamples() {
            // Intialize the HealthKit
            AppleHealthKit.initHealthKit(permissions, (error: string) => {

                if (error) {
                    return;
                }

                let startDate = getMostRecentDateRead();




            })

        }

        return (<View></View>)
    }

export default ListenerComponentHealthKit;
