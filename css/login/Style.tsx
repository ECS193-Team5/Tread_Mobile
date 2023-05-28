import { Platform, StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? "12%" : 0
  },
  
  linearGradient : {
    height : '100%',
    width : '100%',
  },

  linearGradientAuto : {
    height : '100%',
    width : '100%',
    justifyContent : 'center'
  },

  mainContainer : {
		flexDirection: 'column',
		flex: 1,
		marginLeft: '12.5%',
		marginRight: '12.5%',
  },

  titleContainer : {
  	flex: 18,
  	justifyContent: 'flex-end'
  },

  titleText: {
  	color: '#F9A800',
  	fontSize: 55,
  	fontWeight: '400'
  },

  loginContainer : {
 		flex: 50,
 		alignItems: 'center',
 		justifyContent: 'flex-end',
  },

  separatorContainer : {
  	flex: 7,
  	flexDirection: 'row',
  	alignItems: 'center'
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
		backgroundColor: 'white',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
		width: '100%',
		height: '31.25%',
		justifyContent: 'center',
		alignItems: 'center'
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
	},

  logo : {
    height: '50%',
		width: '50%',
    resizeMode: 'contain',
    alignSelf : 'center'
  }
});

export {LoginStyles}