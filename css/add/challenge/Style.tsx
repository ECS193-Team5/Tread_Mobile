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
        backgroundColor: 'white',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 20
    },

    BottomSeparator: {
        flex: 10
    },

    MainDropdown: {
        flex: 1
    },

    ChallengeDropContainer: {
        flex: 30,
        // backgroundColor: 'green',
        marginLeft: '5%',
        marginRight: '5%'
    },

    EnterOwnContainer : {
        flex: 1,
        // backgroundColor: 'blue'
        marginTop: '5%'
    },

    validInput: {
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 2,
        paddingLeft: 25,
//   	color: '#9B9595',
        fontSize : 16,
        color: 'grey'
    },

    invalidInput: {
        borderRadius: 50,
        borderColor: '#C65656',
        borderWidth: 2,
        paddingLeft: 25,
//   	color: '#9B9595',
        fontSize : 16,
        color: '#C65656'
    },

    ActivityTitle: {
        fontWeight: "400",
        fontSize: 16,
        color: '#014421',
        marginTop: '5%',
        marginBottom: '5%'
    },

    ChallengeAmountContainer : {
        flex: 20,
        flexDirection: 'column',
        backgroundColor: 'black',
        marginLeft: '5%',
        marginRight: '5%'
    },

    CompletionDataContainer: {
        flex: 15,
        flexDirection: 'column',
        backgroundColor: 'yellow',
        marginLeft: '5%',
        marginRight: '5%'
    },

    IssueToContainer: {
        flex: 20,
        flexDirection: 'column',
        backgroundColor: 'red',
        marginLeft: '5%',
        marginRight: '5%'
    },

    SubmitContainer: {
        flex: 15,
        flexDirection: 'column',
        backgroundColor: 'purple',
        marginLeft: '5%',
        marginRight: '5%'

    }



});

export {styles}