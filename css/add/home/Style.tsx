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
		backgroundColor: 'yellow'
	},

	SeparatorLine: {
		flex: 1,
		backgroundColor: '#F9A800',
		height: '2%'
	}

});

export {styles}