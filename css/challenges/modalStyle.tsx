import { Platform, StyleSheet } from 'react-native';

const modalstyle = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },

  container : {
    backgroundColor : "#E0E7E3",
    flex :1,
    top : "10%",
    height : "10%",
    borderRadius : 40,
    borderColor : '#014421',
    borderWidth : 2
  },

  PopUpTextContainer : {
    flex: 5,
    backgroundColor : 'brown',
    borderRadius : 40
  },

  PopUpChallengeDescriptionContainer : {
    flex: 9,
    backgroundColor : 'red',
    borderRadius : 40
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    alignSelf: 'stretch',
    justifyContent : 'center',
    marginHorizontal : "10%",
    marginVertical : "2.5%"
  },

  ProgressBarContainer : {
    flex : 60, 
    backgroundColor :'green',
    borderRadius : 40
  },

  FlatListContainer : {
    alignItems : "center",
  },
});

export {modalstyle} 