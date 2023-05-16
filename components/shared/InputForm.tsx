import React, {useEffect, useState} from 'react';
import {TextInput, View} from "react-native";
import {InputFormStyle} from "../../css/shared/InputFormStyle";

function InputForm(props): JSX.Element {
  let initValue = "";
  let curStyle = InputFormStyle.InitInput;
  let textColor = '#9B9595';
  // const [curStyle, setCurStyle] = useState(InputFormStyle.InitInput)
  // const [textColor, setTextColor] = useState('#9B9595');

  useEffect(() => {
    initValue = props.value;
  },[])
  const isValid = (text) => {
    return text.length > 0
  }
  const handleTextChange = (text) => {
    if(initValue === text) {
      curStyle = InputFormStyle.InitInput;
      textColor = '#9B9595';
    } else {
      if(props.valid) {
        curStyle = InputFormStyle.ValidInput;
        textColor = '#014421';
      } else {
        curStyle = InputFormStyle.InvalidInput;
        textColor = '#C65656';
      }
    }

    props.setValid(isValid(text));
    props.setValue(text);
  }

  return (
    <View>
      <TextInput
        placeholder = {props.placeholder}
        style = {curStyle}
        placeholderTextColor = {textColor}
        editable = {props.editable}
        onChangeText={handleTextChange}
      />
    </View>
  )
}

export default InputForm;