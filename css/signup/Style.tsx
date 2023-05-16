import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
  	flexDirection: 'column',
  	flex: 1,
    marginLeft: '10%',
    marginRight: '10%'
  },
  titleContainer: {
  	flex: 20,
  	justifyContent: 'flex-end',
    backgroundColor: 'yellow'
  },
  formContainer: {
    flex: 43,
  	justifyContent: 'space-around',
    // backgroundColor: 'blue'
  },

  displayNameContainer: {
    flex: 20,
    // backgroundColor: 'black',
    marginBottom: '10%'
  },

  userNameContainer: {
    flex: 20,
    marginBottom: '10%',
    // backgroundColor: 'green'
  },

  choosePicContainer: {
    flex: 60,
    backgroundColor: 'purple',
    marginTop: '10%'
  },

  signupContainer: {
    backgroundColor: 'red',
  	flex: 14,
  },

  title: {
  	color: '#014421',
  	fontSize: 32,
  	fontWeight: 400,
    paddingVertical : 30,
  },
  validSignupButton: {
  	backgroundColor: '#014421',
  	height: '35%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  invalidSignupButton: {
  	backgroundColor: '#9B9595',
  	height: '35%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  signupText: {
  	color: 'white',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 700
  },
//     ChoosePicContainer : {
//         flex: 12,
// // 		backgroundColor: 'green',
//         marginLeft: '20%',
//         marginRight: '20%',
//         flexDirection: 'column',
//         justifyContent: 'center'
//     },
//
//     ChoosePicButton : {
//         width: '100%',
//         height: '20%',
//         borderRadius: 50,
//         borderWidth: 1,
//         backgroundColor: '#014421',
//         borderColor: '#014421',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     ChoosePicText : {
//         color: 'white',
//         fontWeight: 700,
//         fontSize: 14
//     },


});

export {styles}