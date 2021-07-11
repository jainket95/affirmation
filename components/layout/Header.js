// rnstyles
//rnfes
// rch

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = ({ title }) => {
	return (
		<View style={styles.heading}>
			<Text style={styles.text}>{title}</Text>
		</View>
	);
};

Header.defaultProps = {
	title: "let's Affirm",
};

const styles = StyleSheet.create({
	heading: {
		height: 50,
		maxHeight: 55,
		backgroundColor: "#F6BF03",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "white",
		fontSize: 23,
		textAlign: "center",
	},
});
export default Header;
