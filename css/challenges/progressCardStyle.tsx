import { Platform, StyleSheet } from 'react-native';

const progressCardStyle = StyleSheet.create({
  CardContainer : {
    width : "80%",
    borderRadius : 20,
    flexDirection : 'row',
    marginBottom: "4.6%",
    paddingVertical : "6%",
  }, 

  ImageSwapSection : {
    flex : 40,
    alignItems : "center",
    justifyContent : "center",
    // backgroundColor : 'purple'
  },

  ProgressBarContainer : {
    flex : 135,
    // backgroundColor : 'brown',
    // alignItems : 'center',
    margin : "5%"
  },

  imageStyle : {
    width :50, 
    height : 50 , 
    borderRadius : 25, 
    borderWidth : 2, 
    borderColor : '#014421'
  },
  

});

export {progressCardStyle}