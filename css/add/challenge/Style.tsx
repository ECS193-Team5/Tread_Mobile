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
        flexDirection: 'row',
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
    }
});

export {styles}