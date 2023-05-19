import { Platform, StyleSheet } from 'react-native';

const SharedStyles = StyleSheet.create({
  dropDownButton : {
    height : "100%",
    width : "30%",
    backgroundColor : "#E0E7E3"
  },

  dropDownText : {
    fontSize : 15,
    color : "#014421"
  },

  dropDownBox : {
    backgroundColor : "#E0E7E3",    
    borderRadius : 20,
  },

  selectedrowStyle : {
    backgroundColor : "rgba(0, 0, 0, 0.1)"
  },

  rowTextStyle : {
    fontSize : 15,
    color : "#014421"
  },

  LeftSliderContainer : {
    margin : 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: "12%",
  },

  RightSliderContainer : {
    margin : 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "12%",
  },

  MultipleRightSliderContainer : {
    margin : 0,
    alignItems: 'center',
    flexDirection : 'row',
    width: "53%",
  },

  MultipleLeftSliderContainer : {
    marginLeft : '2%',
    alignItems: 'center',
    flexDirection : 'row',
    width: "20%",
  },

  ZeroTextStyle : {
    alignSelf : 'center',
    color : '#014221',
    marginTop : '5%', 
    fontSize : 13
  },

  SecondaryPromptStyle : {
    alignSelf : 'center',
    color : '#014221',
    marginTop : '2%', 
    fontSize : 13
  },

  NavigatePrompt : {
    color : '#014221',
    fontSize : 13,
    textDecorationLine : 'underline'
  },

  seperator : {
    borderWidth : 0.5,
    borderColor : "#F9A800",
    alignSelf: 'stretch',
    justifyContent : 'center',
    marginTop : "3.5%",
    marginHorizontal : '3.5%',
    marginBottom : '2.5%'
  },
});

export {SharedStyles}