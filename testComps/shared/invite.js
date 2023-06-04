import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    TouchableHighlight,
} from 'react-native';
import { styles } from '../../css/add/friend/Style';
import axios from "axios";
import { ImageStyles } from '../../css/imageCluster/Style';
// import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux';
import { badgeF_decrement } from '../../redux/actions/badgeF_actions'

function Invite({ text, onFriendChange, onSubmit, goCameraViewPage }) {

    const [friendID, setFriendID] = useState("");
    const [validID, setValidID] = useState(false);

    return (
        <View style={styles.Background}>

            <View style={{ flex: 1 }}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.Title}>
                        {text}
                    </Text>
                </View>

                <View style={styles.InputContainer}>
                    <View style={styles.FriendContainer}>
                        <TextInput
                            placeholder="Enter User ID"
                            placeholderTextColor="grey"
                            style={styles.Input}
                            onChangeText={onFriendChange}
                            value={friendID}
                        >
                        </TextInput>
                        <View>
                            <Pressable
                                onPress={goCameraViewPage}
                            >
                                <Image style={ImageStyles.QR} source={{ uri: 'https://imgur.com/zw0xwNA.png' }} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.SubmitContainer}>
                        <TouchableHighlight style={validID ? styles.ButtonValid : styles.ButtonInvalid}
                                            onPress={onSubmit}
                                            underlayColor='#013319'
                                            disabled={!validID}>
                            <Text style={styles.RequestText}>
                                Send Request
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    )

}

export default Invite;
