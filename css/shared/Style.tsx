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

  buttonStyle : {
    marginHorizontal : '5%'
  }
});

export {SharedStyles}