import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
  	flexDirection: 'column',
  	flex: 1,
    marginLeft: '10%',
    marginRight: '10%'
  },
  titleContainer: {
  	flex: 15,
  	justifyContent: 'flex-end',
    // backgroundColor: 'yellow'
  },
  formContainer: {
    flex: 53,
  	justifyContent: 'space-around',
    // backgroundColor: 'blue'
  },

  displayNameContainer: {
    flex: 13,
    // backgroundColor: 'black',
    marginBottom: '10%'
  },

  userNameContainer: {
    flex: 13,
    marginBottom: '10%',
    // backgroundColor: 'green'
  },

  choosePicContainer: {
    flex: 60,
    // backgroundColor: 'purple',
    marginTop: '10%'
  },

  signupContainer: {
    // backgroundColor: 'red',
  	flex: 19,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  checkBoxContainer: {
    flex: 20,
    // backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center'
  },

  checkboxinput: {
    color: '#9B9595',
    height : 55,
    fontSize : 16,
    paddingLeft : 10,
    paddingRight: 10,
  },

  title: {
  	color: '#014421',
  	fontSize: 32,
  	fontWeight: 400,
    paddingVertical : 30,
  },
  validSignupButton: {
  	backgroundColor: '#014421',
  	height: '25%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  invalidSignupButton: {
  	backgroundColor: '#9B9595',
  	height: '25%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  signupText: {
  	color: 'white',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 700
  },


});

export {styles}