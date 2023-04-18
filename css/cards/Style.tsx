import { Platform, StyleSheet } from 'react-native';

const cardStyles = StyleSheet.create({
  ChallengeSwapCardContainer : {
    flex : 20,
    backgroundColor : "#014421",
    width : "90%",
    borderRadius : 20,
    flexDirection : 'row',
  },
  
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9.11,
    
    elevation: 14,
  },

  CardContainer : {
    flex : 20,
    backgroundColor : "white",
    width : "90%",
    borderRadius : 20
  },

  ImageSection : {
    flex : 45,
    alignItems : "flex-end",
    justifyContent : "center"
  },

  ChallengeSwapTextContainer : {
    flex : 100,
    flexDirection : 'column',
    alignItems : "flex-start",
    justifyContent : "center",
    marginHorizontal : 20,
  },

  ChallengeTypeText : {
    fontWeight : "700",
    fontSize : 32.5,
    lineHeight : 34,
    color : "white",
    marginVertical : 5
  },

  ChallengeCountText : {
    fontWeight : "400",
    fontSize : 17,
    lineHeight : 18,
    color : "#F9A800"
  }
});

export {cardStyles}