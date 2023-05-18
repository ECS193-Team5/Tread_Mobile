import {StyleSheet} from "react-native";

const ImageUploadStyles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: 'green',
  },

  ImagePreviewContainer: {
    // backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  ImagePreview: {
    height: '100%',
    width: '35%',
    borderWidth: 2,
    borderColor: '#014421'
  },

  ChoosePicContainer: {
    // backgroundColor: 'blue',
    marginHorizontal: '15%',
    flex: 1,
  },

  ChoosePicButton : {
    width: '100%',
    height: '40%',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#014421',
    borderColor: '#014421',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },

  ChoosePicText : {
    color: 'white',
    fontWeight: '700',
    fontSize: 14
  },


});

export {ImageUploadStyles}