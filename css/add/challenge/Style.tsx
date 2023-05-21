import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    Background : {
        flexDirection: 'column',
        paddingTop:(Platform.OS === 'ios') ? "12%" : 0,
        flex: 1,
        backgroundColor : "#E0E7E3"
    },

    ToggleContainer : {
        flex: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal : '5%'
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
        flex: 12
    },

    MainDropdown: {
        flex: 1
    },

    ChallengeDropContainer: {
        flex: 17,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom : '2%'

    },

    RecommendChallengeContainer: {
      height : '9%',
      justifyContent : 'center',
      marginTop : '2%',
      marginHorizontal : '2%'
    },

    RecommendTextContainer: {
      flex: 0,
      justifyContent : 'center',
      alignItems : 'center',
      marginTop : '2%',
      marginHorizontal : '2%',
    },

    CustomChalContainer: {
        flex: 8,
        marginLeft: '5%',
        marginRight: '5%'
    },

    EnterOwnContainer : {
        flex: 1,
        marginTop: '1%'
    },

    validInput: {
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 2,
        paddingLeft: 25,
        fontSize : 16,
        color: 'grey'
    },

    invalidInput: {
        borderRadius: 50,
        borderColor: '#C65656',
        borderWidth: 2,
        paddingLeft: 25,
        fontSize : 16,
        color: '#C65656'
    },

    ActivityTitle: {
        fontWeight: "400",
        fontSize: 16,
        color: '#014421',
        marginTop: '5%',
        marginBottom: '5%',
    },

    ChallengeAmountContainer : {
        flex: 20,
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%'
    },

    EnterChallengeAmount: {
      flex: 1,
      flexDirection: 'row',
    },

    NumericInput: {
        flex: 60,
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

        marginHorizontal: '5%'
    },

    CalendarButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '10%'
    },

    StartButton: {
        flex: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    ToTextContainer: {
        flex: 20,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    DateText: {
        color: '#014421',
        fontSize: 16,
        fontWeight: '400',
        borderColor : '#014421',
        borderWidth : 0.5,
        borderRadius : 4
    },

    ToText: {
      color: '#014421',
      fontSize: 16,
      fontWeight: '400'
    },

    EndButton: {
        flex: 40,
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
        flex: 15,
        flexDirection: 'column',
        marginLeft: '5%',
        marginRight: '5%'
    },

    DropDownContainer: {
      flex: 10,
      marginLeft: '5%',
      marginRight: '5%',
      paddingTop : '5%'
  },

    PickIssueTarget: {
        flex: 1,
    },

    SelectTarget: {
        flex: 1,
    },

    SubmitContainer: {
        flex: 10,
        flexDirection: 'column',
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

    RecommendButton : {
      width: '60%',
      height: '60%',
      borderRadius: 50,
      borderWidth: 1,
      backgroundColor: '#014421',
      borderColor: '#014421',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf : 'center',
  },

    IssueChallengeText : {
        color: 'white',
        fontWeight: 700,
        fontSize: 14
    },

    RecommendMessageText : {
      color: '#014421',
      fontWeight: 700,
      fontSize: 14,
      alignSelf : 'center',
      justifyContent : 'center'
  },
});

export {styles}