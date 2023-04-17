import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? 50 : 0
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
  	backgroundColor: 'green'
  },

  signUpContainer: {
  	flex: 20,
  	alignItems: 'center',
  	justifyContent: 'flex-start'
  h},

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
  }

});

export { styles}