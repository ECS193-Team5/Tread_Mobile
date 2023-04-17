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
    backgroundColor : "yellow",
    flex: 15,
  },

  swapChallengeContainer : {
    backgroundColor : "black",
    flex: 40,
  },

  textStyle : {
    fontWeight : "700",
    fontSize : 32.5,
    lineHeight : 34,
    color : "#014421"
  }
});

export { styles}