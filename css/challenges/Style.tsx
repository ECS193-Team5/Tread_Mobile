import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? 50 : 0,
    // backgroundColor : "red",
    flex :1
  },

  topRightClickContainer : {
    flex: 5,
    width : "90%",
  	alignItems: 'flex-end',
    alignSelf : 'center',
    justifyContent : 'center'
  },

  titleContainer : {
    flex: 5,
    width : "90%",
  	alignItems: 'flex-start',
    alignSelf : 'center',
    justifyContent : 'center'
  },

  tabswitchContainer : {
    flex: 12,
    width : "100%",
    justifyContent : 'center',
    alignItems : 'center'
  },

  ChallengesContainer : {
    backgroundColor : "black",
    flex: 40,
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    alignSelf: 'stretch',
    justifyContent : 'center',
    margin : 20,
  },

  TitleText : {
    fontWeight : "700",
    fontSize : 32.5,
    lineHeight : 34,
    color : "#014421"
  },


});

export { styles}