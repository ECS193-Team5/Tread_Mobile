import { Platform, StyleSheet } from 'react-native';

const progressCardStyle = StyleSheet.create({
  CardContainer : {
    // backgroundColor : "#FFFFFF",
    backgroundColor : 'red',
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
    backgroundColor : 'purple'
  },

  ProgressBarContainer : {
    flex : 135,
    backgroundColor : 'brown',
    alignItems : 'center',
  }

});

export {progressCardStyle}