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
  	flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  accountContainer: {
    // backgroundColor: 'blue',
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
  	height: '50%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },
  invalidSignupButton: {
  	backgroundColor: '#9B9595',
  	height: '50%',
  	borderRadius: 50,
  	justifyContent: 'center'
  },

  signupText: {
  	color: 'white',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 700
  },

  accountText: {
    color: '#9B9595'
  }



});

export {styles}