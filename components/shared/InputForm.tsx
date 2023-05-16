import React, {useEffect, useState} from 'react';
import {TextInput, View} from "react-native";
import {InputFormStyle} from "../../css/shared/InputFormStyle";

function InputForm(props): JSX.Element {
  // let curStyle = {};
  const [curStyle, setCurStyle] = useState(InputFormStyle.InitInput)

  useEffect(() => {
    console.log('Value: ' + props.value)
    console.log('Recalculating style');
    if(props.value === "") {
      setCurStyle(InputFormStyle.InitInput)
      // curStyle = InputFormStyle.InitInput;
    } else {
      if(props.valid) {
        setCurStyle(InputFormStyle.ValidInput)

        // curStyle = InputFormStyle.ValidInput
      } else {
        setCurStyle(InputFormStyle.InvalidInput)

        // curStyle = InputFormStyle.InvalidInput;
      }
    }
  })
  const isValid = (text) => {
    return text.length > 0
  }
  const handleTextChange = (text) => {
    props.setValid(isValid(text));
    props.setValue(text);
  }

  return (
    <View>
      <TextInput
        placeholder = {props.placeholder}
        value={props.value}
        style = {curStyle}
        placeholderTextColor = {'#9B9595'}
        editable = {props.editable}
        onChangeText={handleTextChange}
      />
    </View>
  )
}

export default InputForm;