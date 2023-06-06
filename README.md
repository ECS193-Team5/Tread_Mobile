# Tread-Mobile


## Installation


```
git clone https://github.com/ECS193-Team5/Tread_Mobile.git
```


Navigate to the project folder and install the required dependencies.


```
npm install
```


To run the emulator, use command


```
npx react-native start
```



## Technologies

The mobile app is written in React Native. This allows developers to work on the same code and compile separately for iOS and Android platforms.


## Organization

The relevant directories in the source code are as follows:



* **./assets - **This folder contains all the assets required for the app to run. This includes all the icons in the app, the splash screen and other elements
* **./components - **This folder contains all the modular components of our app. It is internally structured by grouping the components to which page they belong on. (SignUp, login etc.)
* **./css - **This folder contains all the CSS for all the pages. It is internally structured the same way the **./components **folder is structured, with the CSS grouped by which page they belong on
* **./pages - **This folder contains the main .tsx files for each page off the app. (Login Page, Challenges Page etc.)
* **./redux - **This folder contains the redux files to keep track of variables app wide. It is used to to keep track of things such as the number to be displayed on badges etc. 
* **./routes - **This folder contains individual exports for different backend call configurations. 
* **./testComps **- This folder contains the Jest Tests written for each component
* **./testPages - **This folder contains the Jest Tests written for each page.


## Testing

The mobile app has unit, integration, and end-to-end testing suites. Tests can be run by themselves or with a coverage report. Test suites are built using the Jest testing library.


### Unit/Integration


```
jest
Jest –coverage
```



## Sensors


### Flow

Both HealthKit and HealthConnect are combined into one component: ListenerHealthSensor. This sensor can be found in /src/components/Sensors/ListenerHealthSensor.

Both HealthKit and HealthConnect follow a similar flow, even if they give different information.



1. Determine what, if any, sensor is available
2. Request Permissions for the sensors
3. If permissions, request sample data

Once permissions have been requested the first time, the sensor will pull data every time the user re-focuses on the Challenges, League Details, or Medals Page. If any workouts are found, this will cause a refresh of the page. These three pages are the ones that visually display workout data to the user. The other pages do not pull sensor data, because they would overwhelm the system by pulling sensor data every time a page was checked. If any pages are added that would show the user the results of their health data, the listener will need to be added to those pages.

Important Note: Health Data takes a few minutes to become viewable to Tread itself, so there is a latency that cannot be shortened.


### Modules

[HealthConnect](https://www.npmjs.com/package/react-native-health-connect)

[HeathKit](https://www.npmjs.com/package/react-native-health)
