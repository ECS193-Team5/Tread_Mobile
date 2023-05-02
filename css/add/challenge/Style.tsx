import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    Background : {
        flexDirection: 'column',
        flex: 1,
        backgroundColor : "#E0E7E3"
    },

    ToggleContainer : {
        flex: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10%',
        marginRight: '10%'
    },

    ChallengeContainer : {
        flexDirection: 'column',
        flex: 80,
        // backgroundColor: 'blue',
        marginLeft: '5%',
        marginRight: '5%'
    },

    BottomSeparator: {
        flex: 10
    },

    MainDropdown: {
        flex: 1
    },

    ChallengeDropContainer: {
        flex: 1,
        // backgroundColor: 'green'
    },

    EnterOwnContainer : {
        flex: 1,
        // backgroundColor: 'blue'
    },

    validInput: {
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 2,
        paddingLeft: 25,
//   	color: '#9B9595',
        fontSize : 16,
    },
});

export {styles}