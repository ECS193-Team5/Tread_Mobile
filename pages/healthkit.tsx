import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'
import React from 'react';
import {
  Button
} from 'react-native';
/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.Workout,],
    write: [AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.Workout,],
  },
} as HealthKitPermissions

//Check healthkit availability
AppleHealthKit.isAvailable((err: Object, available: boolean) => {
  if (err) {
    console.log('error initializing Healthkit: ', err)
    return
  }
})





const functionForHoward = () =>{
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
    console.log("Am I being called?")
    if (error) {
      console.log("THeerror is , ", error);
      console.log('[ERROR] Cannot grant permissions!')
    }
  
    /* Can now read or write to HealthKit */
  
    const options = {
      startDate: new Date(2023, 0, 0).toISOString(),
      endDate: new Date().toISOString(),
      type: 'Workout', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
    }
  
    AppleHealthKit.getSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        /* Samples are now collected from HealthKit */
        console.log('logging: ', results)
        console.log(callbackError)
      },
    )
  })
}

const ButtonForClicking= () => {
  return (<Button title = "ForHoward" onPress={functionForHoward}/>);
}

export default ButtonForClicking;
AppleHealthKit.getAuthStatus(permissions, (err, results) => {
  console.log(err, results)
})