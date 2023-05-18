import { Platform, StyleSheet } from 'react-native';

const InputFormStyle = StyleSheet.create({
  InitInput: {
    borderRadius: 50,
    borderColor: '#9B9595',
    borderWidth: 2,
    paddingLeft: 25,
    color: '#9B9595',
    height : '100%',
    width: '100%',
    fontSize : 16,
  },

  InvalidInput: {
    borderRadius: 50,
    borderColor: '#C65656',
    borderWidth: 2,
    paddingLeft: 25,
    color: '#C65656',
    height : '100%',
    width: '100%',
    fontSize : 16,
  },

  ValidInput: {
    borderRadius: 50,
    borderColor: '#014421',
    borderWidth: 2,
    paddingLeft: 25,
    color: '#014421',
    height : '100%',
    width: '100%',
    fontSize : 16,
  }

});

export {InputFormStyle}