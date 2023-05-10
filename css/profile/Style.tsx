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

    ProfileInfoContainer: {
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
        backgroundColor: 'yellow'
    },

    ProfileImage: {
        height: 110,
        width: 110,
        borderRadius : 55,
        borderWidth : 2,
        borderColor : '#014421'
    },

    ProfileToggleContainer: {
        flex: 30,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        width: '100%'
    },

    MedalsContainer: {
        flex: 55,
        flexDirection: 'column',
        // backgroundColor: 'yellow'
    }
});

export {ProfileStyles};

