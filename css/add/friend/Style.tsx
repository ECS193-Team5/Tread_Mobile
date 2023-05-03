import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	Background : {
		flexDirection: 'column',
		flex: 1,
		backgroundColor : "#E0E7E3"
	},

	TitleContainer : {
		flex: 10,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		marginRight: '5%',
		marginLeft: '5%',
	},

	InputContainer : {
		flex: 30,
		flexDirection: 'column',
		justifyContent: 'flex-start',
    marginHorizontal : '5%',
		backgroundColor: 'white',
		borderRadius: 20,
		marginTop: '5%'
	},

	SeparatorContainer : {
		flex: 60
	},

	Title: {
		fontSize: 28,
		fontWeight: 700,
		color: '#014421',
		marginLeft: '1%'
	},

	FriendContainer: {
		flex: 50,
		flexDirection: 'column',
		justifyContent: 'center',
		marginRight: '6%',
		marginLeft: '6%',
// 		backgroundColor: 'blue'
	},

	SubmitContainer: {
		flex: 50,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: '25%',
		marginLeft: '25%',
// 		backgroundColor: 'red'
	},

	Input: {
		borderRadius: 50,
		borderColor: '#9B9595',
		borderWidth: 1,
		height: '40%',
		paddingLeft: 20,
		color: 'grey'
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