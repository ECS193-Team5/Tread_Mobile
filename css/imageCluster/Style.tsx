import { Platform, StyleSheet } from 'react-native';

const ImageStyles = StyleSheet.create({
  first : {
    width :39, 
    height : 39 , 
    borderRadius : 19.5, 
    borderWidth : 2, 
    borderColor : '#014421'
  },
  
  second: {
    width :39, 
    height : 39 , 
    borderRadius : 19.5, 
    borderWidth : 2, 
    borderColor : '#014421', 
    marginLeft : -12
  },

  third : {
    // alignContent : 'center', 
    justifyContent: 'center',
    width :39, 
    height : 39 , 
    borderRadius : 19.5, 
    borderWidth : 2, 
    borderColor : '#014421', 
    backgroundColor : '#000000',
    marginLeft : -12
  },

  thirdText : {
    width : "80%",
    alignSelf : 'center',
    justifyContent : 'center',
    color : 'white'
  }
});

export {ImageStyles} 