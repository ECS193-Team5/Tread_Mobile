import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'
import React from 'react';
import {
  Button
} from 'react-native';

import {
  initialize,
  requestPermission,
  readRecords,
  getGrantedPermissions,
  getSdkStatus,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';
/* Permission options */
let functionForHoward;
try {
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

  const functionForHoward = () => {
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

  AppleHealthKit.getAuthStatus(permissions, (err, results) => {
    console.log(err, results)
  })
}
catch (err) {
  console.log(err, "oopsies not function");
}

try {
  functionForHoward = async () => {
    console.log("is clicky?")
    const readSampleData = async () => {
      console.log("running function")
      // initialize the client
      const isInitialized = await initialize();
      console.log("isinit", isInitialized)

      // request permissions
      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'ExerciseSession' },
        { accessType: 'write', recordType: 'ExerciseSession' }
      ]);

      console.log("perms", grantedPermissions)


      const readGrantedPermissions = () => {
        getGrantedPermissions().then((permissions) => {
          console.log('Granted permissions ', { permissions });
        });
      };

      readGrantedPermissions();

      console.log("strstrt")
      const checkAvailability = async () => {
        console.log('here')
        const status = await getSdkStatus();
        console.log('next')
        if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
          console.log('SDK is available');
        }

        if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
          console.log('SDK is not available');
        }

        if (
          status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
        ) {
          console.log('SDK is not available, provider update required');
        }
      }
      await checkAvailability();
      console.log("passed check availabliity");
      // check if granted

      const result = await readRecords('ExerciseSession', {
        timeRangeFilter: {
          operator: 'between',
          startTime: '2023-01-09T12:00:00.405Z',
          endTime: '2023-08-09T23:53:15.405Z',
        },
      });
      // {
      //   result: [
      //     {
      //       startTime: '2023-01-09T12:00:00.405Z',
      //       endTime: '2023-01-09T23:53:15.405Z',
      //       energy: {
      //         inCalories: 15000000,
      //         inJoules: 62760000.00989097,
      //         inKilojoules: 62760.00000989097,
      //         inKilocalories: 15000,
      //       },
      //       metadata: {
      //         id: '239a8cfd-990d-42fc-bffc-c494b829e8e1',
      //         lastModifiedTime: '2023-01-17T21:06:23.335Z',
      //         clientRecordId: null,
      //         dataOrigin: 'com.healthconnectexample',
      //         clientRecordVersion: 0,
      //         device: 0,
      //       },
      //     },
      //   ],
      // }
      console.log('tsrtrstts', result);
    };
    await readSampleData();
  }


} catch { }

const ButtonForClicking = () => {
  return (<Button title="ForHoward" onPress={functionForHoward} />);
}

export default ButtonForClicking;