import { Platform, StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
    Background: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor : "#E0E7E3"
    },

    TopSeparator: {
        flex: 3
    },

    ProfileContainer: {
        flex: 23,
        flexDirection: 'column',
        // backgroundColor: 'blue',
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

    ProfileTopContainer: {
        flex: 70,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        width: '100%'
    },

    ProfileImageContainer: {
        flex: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: 'blue'
    },

    ProfileNameContainer: {
        flex: 60,
        // backgroundColor: 'yellow'
    },

    ProfileImage: {
        height: 110,
        width: 110,
        borderRadius : 55,
        borderWidth : 2,
        borderColor : '#014421'
    },

    DisplayNameContainer: {
        flex: 25,
        width: '100%',
        // backgroundColor: 'green',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },

    DisplayNameText: {
        fontWeight: "600",
        fontSize: 28,
        color: '#014421'
    },

    UsernameContainer: {
        flex: 45,
        width: '100%',
        // backgroundColor: 'yellow'
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
        // backgroundColor: 'blue'
        justifyContent: 'center'

    },

    OtherInfoText: {
        fontWeight: '400',
        fontSize: 18,
        color: '#014421'
    },

    ProfileBottomContainer: {
        flex: 30,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        width: '100%'
    },

    OptionsContainer: {
        flex: 30,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: '10%'
    },

    QRContainer: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: '10%'
    },

    MedalsContainer: {
        flex: 55,
        flexDirection: 'column',
        // backgroundColor: 'yellow',
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
        width: '100%'
    }
});

export {ProfileStyles};

