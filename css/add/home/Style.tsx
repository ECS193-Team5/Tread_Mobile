import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	HomePage : {
		flexDirection: 'column',
		flex: 1,
		backgroundColor : "#E0E7E3"
	},

	ButtonContainer : {
		flex: 20,
		marginRight: '5%',
		marginLeft: '5%',
		flexDirection: 'column'
	},

	Separator : {
		flex: 10,
// 		backgroundColor: 'green',
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: '5%',
		marginLeft: '5%',

	},

	Button : {
		height: '100%',
		width: '100%',
		borderRadius: 20,
		backgroundColor: 'yellow',
	},

  Image : {
    height: '55%',
    width: '55%'
  },

	SeparatorLine: {
		flex: 1,
		backgroundColor: '#F9A800',
		height: '2%'
	},

	GradientStyle : {
		borderRadius: 20,
		flex: 1,
		flexDirection: 'row'
	},

	IconContainer: {
		flex: 40,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0
// 		backgroundColor: 'blue'
	},

	TextContainer: {
// 		backgroundColor: 'blue',
		flex: 60,
		flexDirection: 'column'
	},

	TitleContainer: {
		justifyContent: 'flex-end',
		flex: 50
	},

	DescContainer: {
		flex: 50
	},

	Title: {
		color: 'white',
		fontSize: 26,
		fontWeight: 700
	},

	Description: {
		color: '#F9A800',
		fontWeight: 400,
		fontSize: 15,
		marginTop: '2%'
	}



});

export {styles}