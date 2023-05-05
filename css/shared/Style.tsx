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
  }
});

export {SharedStyles}