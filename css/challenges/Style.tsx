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
    fontSize : 15,
    lineHeight : 34,
    color : "white",
  },

  ClearAllValidContainer : {
    backgroundColor : '#014421',
    borderColor : '#014421',
    borderWidth : 2,
    borderRadius : 16,
    alignSelf : 'center',
    justifyContent : 'center',
    position : 'relative',
    right : '-70%',
  },

  ClearAllInvalidContainer : {
    backgroundColor : '#9B9595',
    borderColor : '#9B9595',
    borderWidth : 2,
    borderRadius : 16,
    alignSelf : 'center',
    justifyContent : 'center',
    position : 'relative',
    right : '-70%',
  },

  ClearAllText : {
    fontWeight : "700",
    fontSize : 15,
    lineHeight : 34,
    color : "white",
    marginHorizontal : '5%',
    alignSelf : 'center'
  },

  NotificationTitleContainer : {
    position : 'relative',
    height : '10%',
    width : "90%",
    flexDirection : 'row',
    alignItems: 'center',
    alignSelf : 'center',
  },

  CountandClearContainer : {
    // position : 'relative',
    // height : '10%',
    width : "0%",
    flexDirection : 'row',
    // alignItems: 'center',
    // alignSelf : 'center',
  },

  NotificationCountContainer : {
    justifyContent: 'center',
    alignItems : 'center',
    width :32, 
    height : 32 , 
    borderRadius : 16, 
    backgroundColor : '#014421',
    // marginLeft : '%', 
    marginRight : '7%',
  },

});

export { styles}