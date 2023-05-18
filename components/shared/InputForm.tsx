import React, {useEffect, useState} from 'react';
import {TextInput, View} from "react-native";
import {InputFormStyle} from "../../css/shared/InputFormStyle";

function InputForm(props): JSX.Element {
  const [curStyle, setCurStyle] = useState(InputFormStyle.InitInput)

  useEffect(() => {
    if(props.value === "") {
      setCurStyle(InputFormStyle.InitInput)
    } else {
      if(props.valid) {
        setCurStyle(InputFormStyle.ValidInput)
      } else {
        setCurStyle(InputFormStyle.InvalidInput)
      }
    }
  })
  const isValid = (text) => {
    if(text.length === 0 || text.length > 32) {
      return false
    }

    if (!(/^[a-z0-9]+$/i.test(text))) {
      return false;
    }

    return true
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