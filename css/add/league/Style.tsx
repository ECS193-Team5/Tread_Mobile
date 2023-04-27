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
// 		backgroundColor: 'blue'
	},

	Title: {
		fontSize: 28,
		fontWeight: 700,
		color: '#014421',
		marginLeft: '1%'
	},

	InputContainer : {
		flex: 80,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: '5%',
		marginLeft: '5%',
		backgroundColor: 'white',
		borderRadius: 20,
		marginTop: '5%'
	},

	SeparatorContainer : {
		flex: 10
	},

	InputTitle : {
		flex: 8,
// 		backgroundColor: 'blue',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		marginLeft: '10%'
	},

	InputTitleText : {
		fontSize: 16,
		color: '#014421',
		fontWeight: '400'
	},

	ChoosePicContainer : {
		flex: 12,
// 		backgroundColor: 'green',
		marginLeft: '20%',
		marginRight: '20%',
		flexDirection: 'column',
		justifyContent: 'center'
	},

	ChoosePicButton : {
		width: '100%',
		height: '50%',
		borderRadius: 50,
		borderWidth: 1,
		backgroundColor: '#D9D9D9',
		borderColor: '#D9D9D9'
	},

	EnterLeagueContainer : {
		flex: 12,
		backgroundColor: 'green'
	},

	EnterDescContainer : {
		flex: 20,
		backgroundColor: 'green'
	},

	ChooseSecContainer : {
		flex: 8,
		backgroundColor: 'green'
	},

	EnterButtonContainer : {
		flex: 16,
		backgroundColor: 'red'
	},

});

export {styles}