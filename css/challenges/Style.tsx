import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    paddingTop:(Platform.OS === 'ios') ? "12%" : 0,
    backgroundColor : "#E0E7E3",
    flex :1
  },

  topRightClickContainer : {
    position : 'relative',
    height : '5%',
    width : "90%",
  	alignItems: 'flex-end',
    alignSelf : 'center',
    justifyContent : 'center',
  },

  titleContainer : {
    position : 'relative',
    height : '10%',
    width : "90%",
  	alignItems: 'flex-start',
    alignSelf : 'center',
    justifyContent : 'center',
  },

  tabswitchContainer : {
    flex: 12,
    width : "100%",
    justifyContent : 'center',
    alignItems : 'center'
  },

  ChallengesContainer : {
    flex: 40,
    marginBottom : "7.5%",
  },

  FlatListContainer : {
    alignItems : "center",
  },

  filterContainer : {
    flex : 1.5,
    width : "90%",
    alignSelf : 'center',
    alignItems : 'flex-end',
    justifyContent : 'center',
    marginBottom : '5%'
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    alignSelf: 'stretch',
    justifyContent : 'center',
    margin : "4.5%",
  },

  TitleText : {
    fontWeight : "700",
    fontSize : 32.5,
    lineHeight : 34,
    color : "#014421"
  },

  TabNavigatorPlaceHolder : {
    flex : 20
  },

  FilterText: {
    color: "#014421"
  },

  NotificationCountText : {
    fontWeight : "700",
    fontSize : 20,
    lineHeight : 34,
    color : "#d93030",
    borderColor : '#014421',
    borderWidth : 2,
    borderRadius : 16,
    alignSelf : 'center'
  },

  NotificationTitleContainer : {
    position : 'relative',
    height : '10%',
    width : "90%",
    flexDirection : 'row',
    marginLeft : '5%',
    alignItems: 'center',
  }


});

export { styles}