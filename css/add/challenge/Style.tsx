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
        // backgroundColor: 'black',
        marginLeft: '5%',
        marginRight: '5%'
    },

    EnterChallengeAmount: {
      flex: 1,
      flexDirection: 'row',
    },

    NumericInput: {
        flex: 60,
        // backgroundColor: 'blue'
        flexDirection: 'row',
        justifyContent: 'center'
    },

    UnitDropdown: {
      flex: 40,
        marginRight: '10%'
    },

    CompletionDataContainer: {
        flex: 15,
        flexDirection: 'column',
        // backgroundColor: 'yellow',
        // marginLeft: '5%',
        // marginRight: '5%'
        marginHorizontal: '5%'
    },

    CalendarButtonContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '10%'
    },

    StartButton: {
        flex: 40,
        // backgroundColor: 'yellow',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    ToTextContainer: {
        flex: 20,
        // backgroundColor: 'red',
        // color: '#014421',
        // fontSize: 16,
        // fontWeight: '400',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    DateText: {
        color: '#014421',
        fontSize: 16,
        fontWeight: '400',
    },

    EndButton: {
        flex: 40,
        // backgroundColor: 'blue',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },

    CalendarImageIcon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        marginBottom: '10%'
    },

    CalendarPickerModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    IssueToContainer: {
        flex: 25,
        flexDirection: 'column',
        // backgroundColor: 'red',
        marginLeft: '5%',
        marginRight: '5%'
    },

    PickIssueTarget: {
        flex: 1,
        // backgroundColor: 'blue'
    },

    SelectTarget: {
        flex: 1,
        // backgroundColor: 'red'
    },

    SubmitContainer: {
        flex: 10,
        flexDirection: 'column',
        // backgroundColor: 'purple',
        // marginLeft: '5%',
        // marginRight: '5%'
        marginHorizontal: '30%',
        justifyContent: 'center'
    },

    EnterButtonValid : {
        width: '100%',
        height: '60%',
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: '#014421',
        borderColor: '#014421',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    EnterButtonInvalid : {
        width: '100%',
        height: '60%',
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: 'grey',
        borderColor: 'grey',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    IssueChallengeText : {
        color: 'white',
        fontWeight: 700,
        fontSize: 14
    },




});

export {styles}