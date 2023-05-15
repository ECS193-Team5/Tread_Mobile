import { Platform, StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? "12%" : 0
  },
  
  linearGradient : {
    height : '100%',
    width : '100%',
  },

  mainContainer : {
		flexDirection: 'column',
		flex: 1,
		marginLeft: '12.5%',
		marginRight: '12.5%',
// 		backgroundColor: 'yellow'
  },

  titleContainer : {
  	flex: 20,
//   	backgroundColor: 'red',
  	justifyContent: 'flex-end'
  },

  titleText: {
  	color: '#F9A800',
  	fontSize: 55,
  	fontWeight: 400
  },

  loginContainer : {
 		flex: 50,
 		alignItems: 'center',
 		justifyContent: 'flex-end',
//  		backgroundColor: 'blue'
  },

  separatorContainer : {
  	flex: 10,
  	flexDirection: 'row',
  	alignItems: 'center'
//   	backgroundColor: 'green'
  },

  outsideSeparator: {
    flex: 40,
    backgroundColor: '#F9A800',
    height: '1%'
  },

  middleSeparator: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  orText: {
    fontSize: 15,
    fontWeight: 400,
    color: '#F9A800'
  },

  signUpContainer: {
  	flex: 20,
  	alignItems: 'center',
  	justifyContent: 'flex-start'
  },

//   LoginButtonContainer: {
// //     alignSelf : 'center',
// //     position : 'relative',
// //     width : '85%',
// //     top : '75%',
//     backgroundColor: "#d9d9d9",
//     borderRadius: 30,
//     paddingVertical: 10,
//   },
	loginButton : {
		backgroundColor: 'white',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
		width: '100%',
		height: '12.5%',
		justifyContent: 'center',
		alignItems: 'center'
	},

	loginButtonText: {
		fontSize: 20,
		color: "#012412",
		fontWeight: "700"
	},

	signupButton : {
		backgroundColor: 'transparent',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
		width: '100%',
		height: '31.25%',
		justifyContent: 'center',
		alignItems: 'center'
	},

  signupButtonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "700"
  },

	pushupImage: {
		height: '75%',
		width: '75%',
		resizeMode: 'contain',
		position: "absolute",
		left: '55%',
		bottom: '40%'
	},

	liftingImage: {
		height: '75%',
		width: '75%',
		resizeMode: 'contain',
		position: "absolute",
		right: '55%'
	},

	skiImage: {
		height: '75%',
		width: '75%',
		resizeMode: 'contain',
		position: "absolute",
		top: '15%',
		left: '35%'
	}


});

export {LoginStyles}