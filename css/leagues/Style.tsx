import { Platform, StyleSheet } from 'react-native';

const LeagueStyles = StyleSheet.create({
  LeagueInfoCardContainer : {
    flex : 24, 
    alignItems : 'center',
  },

  MembersChallengesContainer : {
    flex : 60,
    // marginBottom : '20%'
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
    flex : 60,
    alignItems : 'flex-start',
    justifyContent : 'center',
  },

  LeagueInfoContainer : {
    flex : 75,
    flexDirection : 'row',
    width : '100%',
  },

  ToggleContainer : {
    flex : 20,
    flexDirection : 'row',
    margin :"1.5%",
    width : '100%',
    alignItems : 'center'
  },

  LeagueImageContainer : {
    flex : 50,
    alignItems : 'center',
    justifyContent : 'center'
  }  
});

export {LeagueStyles}