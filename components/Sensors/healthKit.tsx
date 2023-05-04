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
import {BACKEND_URL} from '@env';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const ListenerComponentHealthKit = () =>{
    useEffect(() => {
        try{
        AppleHealthKit.isAvailable((err: Object, available: boolean) => {
            if (err) {
                console.log('error initializing Healthkit: ', err)
                throw err;
            }
        })

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Cycling:new',
            async () => {
                console.log('--> Cycling observer triggered');
                pullSamples();
            },
        );

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Running:new',
            async () => {
                console.log('--> Running observer triggered');
                pullSamples();
            },
        );

        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:StairClimbing:new',
            async () => {
                console.log('--> StairClimbing observer triggered');
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Swimming:new',
            async () => {
                console.log('--> Swimming observer triggered');
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Walking:new',
            async () => {
                console.log('--> Walking observer triggered');
                pullSamples();
            },
        );
        new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
            'healthKit:Workout:new',
            async () => {
                console.log('--> Workout observer triggered');
                pullSamples();
            },
        );
        pullSamples();
        }
        catch(err){
            console.log("Error in HealthKit - Either this is not an apple device or permissions was not given");
        }
    });



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
            console.log(err, results)
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
                url: BACKEND_URL + 'sensors/get_sensor_date',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                },
                data:{
                    sensorType:"healthKit"
                }
              };

              axios(config)
                .then((response) => {
                    return response.data;
                })
                .catch(function (error) {
                    return Date.now();
                });

                return 1672556406000;
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

        function convertWorkout(workoutData){
            let name = HealthKit[workoutData.activityName];
            let start = Date.parse(workoutData.start);
            let end = Date.parse(workoutData.end);
            let timeMin = (end-start)/(1000*60);
            return ({
                loggedDate: start,
                unit: "min",
                amount: timeMin,
                exerciseName: name
            });

        }
        function giveServerResults(result){
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
        function pullSamples() {
            // Intialize the HealthKit
            AppleHealthKit.initHealthKit(permissions, (error: string) => {

                /* Called after we receive a response from the system */
                if (error) {
                    console.log("No permission for Apple Device");
                    return;
                }

                /* Can now read or write to HealthKit  */
                let startDate = getMostRecentDateRead();


                let options = createOptionsList(startDate);

                let allResults = [];

                AppleHealthKit.getSamples(
                    options,
                    (callbackError: string, results: HealthValue[]) => {
                        results.forEach((item) => {allResults.push(convertWorkout(item))} )
                        giveServerResults(allResults);
                    },
                );

            })

        }

        return (<View></View>)
    }

export default ListenerComponentHealthKit;
