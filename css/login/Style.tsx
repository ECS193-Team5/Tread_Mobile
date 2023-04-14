import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // container : {
  //   alignItems : 'center',
  //   justifyContent : 'center',
  // },
  
  linearGradient : {
    borderRadius : 5,
    height : '100%',
    width : '100%',
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export { styles}