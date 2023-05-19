import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  TitleContainer: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '10%'
  },

  TitleText: {
    color: '#014421',
    fontSize: 32,
    fontWeight: '400',
  },

  InputContainers: {
    flex: 40,
    flexDirection: 'column',
  },

  SubmitContainer: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '25%'
  },

  DeleteContainer: {
    flex: 20,
    flexDirection: 'column',
    marginHorizontal: '15%'
  },

  DisplayNameInput: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '10%',
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

  deleteButton: {
    backgroundColor: '#C65656',
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

})

export default styles;