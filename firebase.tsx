import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const firebaseConfig = {
	apiKey: "AIzaSyCIcGRa8RF_55qms1EZnfONr_9RyHqvxzQ",
	authDomain: "tread-379302.firebaseapp.com",
	projectId: "tread-379302",
	storageBucket: "tread-379302.appspot.com",
	messagingSenderId: "171571653869",
	appId: "1:171571653869:web:4e13f823954e00013d30e4"
};

const app = await firebase.initializeApp(firebaseConfig);
