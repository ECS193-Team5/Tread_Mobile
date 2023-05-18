import { Platform, StyleSheet } from 'react-native';

const modalstyle = StyleSheet.create({

  container : {
    backgroundColor : "#E0E7E3",
    flex :1,
    top : "10%",
    height : "10%",
    borderRadius : 40,
    borderColor : '#014421',
    borderWidth : 2,
  },

  PopUpTextContainer : {
    flex: 5,
    borderRadius : 40,
    alignItems : 'center',
    justifyContent : 'center'
  },

  PopUpChallengeDescriptionContainer : {
    flex: 9,
    width : "80%",
    borderRadius : 40,
    alignItems : 'flex-start',
    alignSelf : 'center',
    justifyContent : 'center'
  },

  ChallengeInfoIndividualContainer : {
    flex : 10,
    alignContent : 'flex-start',
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    alignSelf: 'stretch',
    justifyContent : 'center',
    marginHorizontal : "10%",
    marginVertical : "2.5%"
  },

  ProgressContainer : {
    flex : 60,
    marginBottom : "25%"
  },

  FlatListContainer : {
    alignItems : "center",
  },

  TitleTextStyle : {
    fontWeight : '600',
    fontSize : 20,
    color : "#014421"
  },

  InfoTypeTextStyle : {
    fontWeight : '500',
    fontSize : 15,
    color : "#014421"
  },

  InfoTextStyle : {
    fontWeight : '300',
    fontSize : 15,
    color : "#014421"
  },

  QRTextContainer : {
    flex: 25,
    alignItems : 'center',
    width : '90%',
    alignSelf : 'center',
    justifyContent : 'center',
  },

  QRTitleTextStyle : {
    fontWeight : '600',
    fontSize : 35,
    color : "#014421"
  },

  QRCodeContainerStyle : {
    borderRadius : 40,
    height: 300,
    borderWidth : 2,
    width : 300,
    alignSelf : 'center',
    borderColor : '#F9A800',
    backgroundColor : '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center'
  },

  QRCodePromptTextStyle : {
    fontWeight : '600',
    fontSize : 17,
    color : "#014421"
  },

  QRCodePromptContainer : {
    flex: 5,
    borderRadius : 40,
    alignItems : 'center',
    marginTop : '5%'
  },

  PopUpPromptContainer : {
    backgroundColor : '#E0E7E3',
    position : 'relative',
    bottom : '18.5%',
    left : '16%',
    width : '35%',
    borderRadius : 20,
    borderWidth : 1,
    borderColor : '#014421'
  },

  PopUpPromptContainerProfile : {
    backgroundColor : '#E0E7E3',
    position : 'relative',
    bottom : '32%',
    left : '55%',
    width : '35%',
    borderRadius : 20,
    borderWidth : 1,
    borderColor : '#014421'
  },

  PopUpOptionText : {
    alignSelf : 'flex-start',
    margin : '5%',
    color: '#014421',
    fontWeight : '600',
    flexDirection : 'row',
  }
});

export {modalstyle}