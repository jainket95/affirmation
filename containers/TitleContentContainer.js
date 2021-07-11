import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const TitleContentContainer = ({
	heading,
	content,
	buttonText,
	designType,
	disabled,
	onHandleClick,
}) => {
	const onButtonPress = (param) => {
		onHandleClick(param);
	};

	return (
		<View style={{ ...styles.root, marginBottom: buttonText ? 30 : 0 }}>
			<Text
				style={{
					...styles.heading,
					marginBottom: designType === "modal" ? 0 : 5,
					textDecorationLine: designType === "modal" ? "underline" : "none",
					textTransform: designType === "modal" ? "uppercase" : "none",
					fontSize: designType === "modal" ? 23 : 21,
				}}>
				{heading}
			</Text>
			<Text
				style={{
					...styles.content,
					fontWeight: designType === "modal" ? "bold" : "normal",
					fontSize: designType === "modal" ? 20 : 16,
				}}>
				{content}
			</Text>

			{buttonText && (
				<TouchableOpacity
					// disabled={disabled}
					style={{
						...styles.button,
						backgroundColor: buttonText === "display" ? "white" : "aqua",
					}}
					onPress={() => onButtonPress(buttonText)}>
					<Text
						// title={buttonText}
						style={{
							...styles.buttonText,
						}}
						accessibilityLabel={buttonText}>
						{buttonText}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

// TitleContentContainer.defaultProps = {
// 	heading: "Introduction",
// 	content:
// 		"Affirmations are positive statements that can help you to challenge and overcome self-sabotaging and negative thoughts. You can use this overly-convoluted tool to fetch an affirmation for joy and positive change.",
// };

const styles = StyleSheet.create({
	root: {
		width: "100%",
		height: "auto",
		display: "flex",
		padding: 10,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		// marginBottom: 30,
	},
	heading: {
		fontSize: 21,
		fontWeight: "bold",
		// marginBottom: 5,
	},
	content: {
		fontSize: 16,
	},
	button: {
		width: 80,
		height: 30,
		marginTop: 10,
		borderWidth: 1.5,
		borderStyle: "solid",
		borderColor: "black",

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		textTransform: "uppercase",
		color: "black",
	},
});

export default TitleContentContainer;
