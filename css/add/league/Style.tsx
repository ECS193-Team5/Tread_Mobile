import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	Background : {
		flexDirection: 'column',
		flex: 1,
		backgroundColor : "#E0E7E3"
	},

	TitleContainer : {
    position : 'relative',
    height : '9%',
		flexDirection: 'column',
		justifyContent: 'flex-end',
    marginHorizontal : '5%',
    marginTop : '5%'
	},

  filterContainer : {
    flex : 1.5,
    width : "90%",
    alignSelf : 'center',
    alignItems : 'flex-end',
    justifyContent : 'center',
    marginBottom : '5%'
  },

	Title: {
		fontSize: 28,
		fontWeight: 700,
		color: '#014421',
		marginLeft: '1%'
	},

	InputContainer : {
		flex: 78,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginRight: '5%',
		marginLeft: '5%',
		backgroundColor: 'white',
		borderRadius: 20,
		marginTop: '5%'
	},

	SeparatorContainer : {
		flex: 12
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
		flex: 36,
// 		backgroundColor: 'green',
		marginLeft: '10%',
		marginRight: '10%',
		marginTop: '10%',
		flexDirection: 'column',
		justifyContent: 'center'
	},

	ChoosePicButton : {
		width: '100%',
		height: '50%',
		borderRadius: 50,
		borderWidth: 1,
		backgroundColor: '#014421',
		borderColor: '#014421',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

	ChoosePicText : {
		color: 'white',
		fontWeight: 700,
		fontSize: 14
	},

	EnterLeagueContainer : {
		flex: 8,
		marginRight: '10%',
		marginLeft: '10%',
		flexDirection: 'column',
		justifyContent: 'center',
		marginBottom: '5%'
// 		backgroundColor: 'green'
	},

	NameInput: {
		borderRadius: 50,
		borderColor: '#9B9595',
		borderWidth: 1,
		height: '60%',
		paddingLeft: 20,
		color: 'grey'
	},

	DescInput: {
		borderRadius: 25,
		borderColor: '#9B9595',
		borderWidth: 1,
		height: '80%',
		paddingLeft: 20,
		textAlignVertical: 'top',
		color: 'grey'
	},

	EnterDescContainer : {
		flex: 14,
		marginRight: '10%',
		marginLeft: '10%',
		flexDirection: 'column',
		justifyContent: 'center'
// 		backgroundColor: 'green'
	},

	ChooseSecContainer : {
		flex: 16,
		marginRight: '15%',
		marginLeft: '15%',
		flexDirection: 'column',
		justifyContent: 'center'
// 		marginTop: '2%'
// 		backgroundColor: 'green'
	},

	EnterButtonContainer : {
		flex: 17,
// 		backgroundColor: 'red',
		marginLeft: '30%',
		marginRight: '30%',
		flexDirection: 'column',
		justifyContent: 'center'
	},

	EnterButtonValid : {
		width: '100%',
		height: '50%',
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
		height: '50%',
		borderRadius: 50,
		borderWidth: 1,
		backgroundColor: '#9B9595',
		borderColor: '#9B9595',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

});

export {styles}