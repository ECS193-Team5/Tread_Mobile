import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	Background : {
		flexDirection: 'column',
		flex: 1,
		backgroundColor : "#E0E7E3",
    paddingTop:(Platform.OS === 'ios') ? '2%' : 0,
	},

	TitleContainer : {
		flex: 5,
		flexDirection: 'column',
		justifyContent: 'flex-end',
    marginHorizontal : '6%',
	},

  LeagueTitleContainer : {
		flex: 20, 
		flexDirection: 'column',
		justifyContent: 'center',
    // backgroundColor : 'green',
    marginHorizontal : '2%',
    marginBottom : '2%',
	},

  SuggestedTitleContainer : {
		flex: 2,
    marginHorizontal : '5%',
	},

  SuggestedUserContainer : {
		flex: 20,
	},

	InputContainer : {
		flex: 30,

    marginHorizontal : '5%',
		backgroundColor: 'white',
		borderRadius: 20,
		marginTop: '5%'
	},

	SeparatorContainer : {
		flex: 60,
	},

	Title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#014421',
		// marginLeft: '1%'
    // backgroundColor : 'green'
	},

	FriendContainer: {
		flex: 50,
		flexDirection: 'row',
		justifyContent: 'center',
    width : '100%',
    alignItems : 'center',
	},

	SubmitContainer: {
		flex: 50,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: '25%',
		marginLeft: '25%',
	},

	Input: {
		borderRadius: 50,
		borderColor: '#9B9595',
		borderWidth: 1,
    	width : '80%',
		paddingLeft: 20,
		color: 'grey',
    marginLeft : '5%',
    height : '35%'
	},

	ButtonValid: {
		height: '45%',
  	backgroundColor: '#014421',
  	borderRadius: 50,
  	justifyContent: 'center'
	},

	ButtonInvalid: {
		height: '45%',
  	backgroundColor: '#9B9595',
  	borderRadius: 50,
  	justifyContent: 'center'
	},

	RequestText: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 16,
		fontWeight: 700
	}

});

export {styles}