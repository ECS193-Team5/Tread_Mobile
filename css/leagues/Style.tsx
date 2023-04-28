import { Platform, StyleSheet } from 'react-native';

const LeagueStyles = StyleSheet.create({
  LeagueInfoCardContainer : {
    flex : 24, 
    alignItems : 'center',
  },

  MembersChallengesContainer : {
    flex : 60,
    // backgroundColor :'yellow'
  },

  LeagueInfoCard : {
    flex : 20,
    width : "90%",
    borderRadius : 20,
    flexDirection : 'column',
    alignItems : 'center',
    backgroundColor : "#FFFFFF",
  },

  LeagueNameContainer : {
    flex : 20,
    margin :"2.5%",
    alignItems : 'center'
  },

  ToggleContainer : {
    flex : 20,
    margin :"2.5%",
    width : '60%',
    alignItems : 'center'
  },

  LeagueImageContainer : {
    flex : 55,
    // margin : "1%",
  },
  
});

export {LeagueStyles}