import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { modalstyle } from '../../css/shared/modalStyle';

function MenuPopUp({options}) {  
  var clickableOptions = []
  const Divider = () => <View style={styles.divider} />;

  for (let item of options){
    clickableOptions.push(item())
    clickableOptions.push(Divider())
  }

  clickableOptions.pop()
  
  return(
    <View style = {modalstyle.PopUpPromptContainerProfile}>
      {clickableOptions}
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth * 3,
    backgroundColor: "#014421",
  },
 });
 

export default MenuPopUp;