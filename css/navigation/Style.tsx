import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	navBarStyle: {

		height : (Platform.OS === 'android') ? 70 : 85,
		overflow : 'hidden',
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		position: 'absolute',
		borderColor : "#014421",
		borderWidth : 0.5,
		borderTopColor : "#014421",
		borderTopWidth : (Platform.OS === 'android') ? 0.75 : 0.5,
	}
});

export {styles}