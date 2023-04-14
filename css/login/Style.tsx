import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? 20 : 0
  },
  
  linearGradient : {
    height : '100%',
    width : '100%',
  },

  LoginButtonContainer: {
    alignSelf : 'center',
    position : 'relative',
    width : '85%',
    top : '75%',
    backgroundColor: "#d9d9d9",
    borderRadius: 30,
    paddingVertical: 10,
    // paddingHorizontal: 3
  },

  SignUpButtonContainer: {
    alignSelf : 'center',
    position : 'relative',
    width : '85%',
    top : '75%',
    borderColor : '#FFFFFF',
    borderRadius: 30,
    borderWidth : 2,
    paddingVertical: 10,
    // paddingHorizontal: 3
  },

  LoginButtonText: {
    fontSize: 18,
    color: "#012412",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  SignUpButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  space : {
    width : '2%',
    height : '2%'
  },

  line : { 
    height: 1, 
    backgroundColor: '#f9a800'
  }


});

export { styles}