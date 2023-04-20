import { Platform, StyleSheet } from 'react-native';

const cardStyles = StyleSheet.create({
  ChallengeSwapCardContainer : {
    flex : 20,
    backgroundColor : "#014421",
    width : "90%",
    borderRadius : 20,
    flexDirection : 'row',
  },
  
  ChallengeCardContainer : {
    backgroundColor : "#FFFFFF",
    width : "90%",
    borderRadius : 20,
    flexDirection : 'row',
    marginBottom: "4.6%",
    paddingVertical : "6%"
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    justifyContent : 'center',
    alignSelf : 'center',
    height : "130%",
  },

  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    
    elevation: 14,
  },

  ImageSwapSection : {
    flex : 45,
    alignItems : "center",
    justifyContent : "center",
  },

  ImageContainer : {
    flex : 35,
    flexDirection:'row',
    alignItems : "center",
    justifyContent : "center",
  },

  ChallengeSwapTextContainer : {
    flex : 100,
    flexDirection : 'column',
    alignItems : "flex-start",
    justifyContent : "center",
  },

  ChallengeCardTextContainer : {
    flex : 80,
    flexDirection : 'row',
    alignItems : "center",
    marginHorizontal : "0.5%"
  },

  ChallengeProgressContainer : {
    flex : 55,
  },

  ChallengeNameContainer : {
    flex : 90,
    alignItems : 'center',
    paddingHorizontal : '3.5%'
  },

  ChallengeTypeText : {
    fontWeight : "700",
    fontSize : 32.5,
    lineHeight : 34,
    color : "white",
    marginVertical : "2%"
  },

  ChallengeCountText : {
    fontWeight : "400",
    fontSize : 17,
    lineHeight : 18,
    color : "#F9A800"
  },

  ChallengeNameText : {
    fontWeight : "500",
    fontSize : 14.5,
    lineHeight : 16,
    color : "#014421",
  },

  ChallengeProgressText : {
    fontWeight : "500",
    alignSelf: 'center',
    fontSize : 14,
    lineHeight : 16,
    color : "#014421",
  }
});

export {cardStyles}