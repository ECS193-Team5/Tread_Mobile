import { Platform, StyleSheet } from 'react-native';

const progressCardStyle = StyleSheet.create({
  CardContainer : {
    width : "89%",
    borderRadius : 20,
    flexDirection : 'row',
    marginBottom: ".6%",
    paddingVertical : "3%",
    alignItems : 'center',
  }, 

  LeagueCardContainer : {
    width : "89%",
    borderRadius : 20,
    flexDirection : 'row',
    marginBottom: ".6%",
    paddingVertical : "3%",
    alignItems : 'center',
    backgroundColor : '#FFFFFF'
  }, 


  ImageSwapSection : {
    flex : 40,
    alignItems : "center",
    justifyContent : "center",
    margin : "2%",
  },

  ProgressBarContainer : {
    flex : 135,
    justifyContent : 'center',
  },

  ProgressPercentContainer : {
    flex : 25,
    justifyContent : 'center',
    margin : "3%",
  },

  imageStyle : {
    width :50, 
    height : 50 , 
    borderRadius : 25, 
    borderWidth : 2, 
    borderColor : '#014421'
  },

  ProgressTextStyle : {
    color : "#F9A800",
    fontWeight : '700',
    marginLeft : '2%',
    justifyContent : 'center',
    position : 'absolute',    
  },

  ScoreTextStyle : {
    color : "#014421",
    fontWeight : '700',
  },
  

});

export {progressCardStyle}