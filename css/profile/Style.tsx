import { Platform, StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
    Background: {
        paddingTop:(Platform.OS === 'ios') ? "12%" : 0,
        flexDirection: 'column',
        flex: 1,
        backgroundColor : "#E0E7E3"
    },

    TopSeparator: {
        flex: 0
    },

    ProfileContainer: {
        flex: 23,
        flexDirection: 'column',
        alignItems: 'center'
    },

    ProfileCard: {
        flex : 1,
        width : "90%",
        borderRadius : 20,
        flexDirection : 'column',
        alignItems : 'center',
        backgroundColor : "#FFFFFF",
    },

    ProfileSettingsContainer: {
      flex: 30,
      flexDirection: 'row',
      width: '100%'
    },

    ProfileTopContainer: {
        flex: 100,
        flexDirection: 'row',
        width: '100%'
    },

    ProfileImageContainer: {
        flex: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ProfileNameContainer: {
        flex: 60,
    },

    ProfileImage: {
        height: 110,
        width: 110,
        borderRadius : 55,
        borderWidth : 2,
        borderColor : '#014421'
    },

    DisplayNameContainer: {
        flex: 35,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },

    DisplayNameText: {
        fontWeight: "600",
        fontSize: 28,
        color: '#014421'
    },

    UsernameContainer: {
        flex: 25,
        width: '100%',
    },

    UsernameText: {
      fontWeight: "300",
      fontSize: 16,
      color: '#F9A800'
    },

    OtherInfoContainer: {
        flex: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'

    },

    OtherInfoText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#014421',
    },

    SecondaryText: {
      fontWeight: '500',
      fontSize: 18,
      color: '#014421',
  },

    ProfileBottomContainer: {
        flex: 60,
        flexDirection: 'row',
        width: '100%',
    },

    OptionsContainer: {
      flex: 30,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginRight: '3%',
  },

    QRContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: '10%'
    },

    MedalsContainer: {
        flex: 55,
        flexDirection: 'column',
        alignItems: 'center'
    },

    Separator: {
        borderWidth : 0.5,
        borderColor : "#F9A800",
        alignSelf: 'stretch',
        justifyContent : 'center',
        margin : "4.5%",
    },

    MedalType: {
        width: '90%',
    },

    MedalScroll: {
        marginTop: '5%',
        marginBottom : "28%",
        width: '100%'
    }
});

export {ProfileStyles};

