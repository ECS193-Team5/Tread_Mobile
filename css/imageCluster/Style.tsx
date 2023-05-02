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
  },

  weekly :{
    width :50, 
    height : 50
  },

  single :{
    width :50, 
    height : 50,
    borderRadius : 25, 
    borderWidth : 2, 
    borderColor : '#014421'
  },

  AcceptOrDecline : {
    width :39, 
    height : 39 , 
  },

  QR : {
    width :28, 
    height : 28,
    paddingHorizontal : '8%',
    alignSelf : 'center'
  },

  Leave : {
    width :39, 
    height : 39,
    paddingHorizontal : '8%',
    alignSelf : 'center'
  },

  LeagueImage : {
    width :110, 
    height : 110 , 
  },

  QRCode : {
    width :375, 
    height : 375,
    alignSelf : 'center'
  },
});

export {ImageStyles} 