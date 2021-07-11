import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	Button,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";
import TitleContentContainer from "./TitleContentContainer";

const styles = StyleSheet.create({
	rootModal: {
		// width: "100%",
		// height: "auto",
		flex: 1,

		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	// centeredView: {
	// 	width: "100%",
	// 	height: "auto",
	// 	flex: 1,
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	position: "relative",
	// },
	modalView: {
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,

		width: 350,
		height: 250,

		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 0, 9)",
		borderWidth: 2,
		borderStyle: "solid",
		borderColor: "black",
	},
	close: {
		fontSize: 28,
		position: "absolute",
		top: 0,
		left: "113%",
	},
	button: {
		width: 70,
		maxWidth: 70,
		height: 30,
		marginTop: 15,
		// display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		color: "black",
		backgroundColor: "aqua",
		borderWidth: 1.5,
		borderStyle: "solid",
		borderColor: "black",
		textTransform: "uppercase",
		marginLeft: 10,
	},

	buttonText: {
		width: "100%",
		height: "100%",
		textTransform: "uppercase",
		color: "black",
		textAlign: "center",
		textAlignVertical: "center",
	},

	buttonContainer: {
		width: "100%",
		height: 40,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 50,
	},
});

const CustomModal = ({
	titleContentProps,
	modalVisible,
	setModalVisible,
	onDataFetch,
	withButtons,
}) => {
	// const [modalVisible, setModalVisible] = useState(false);

	return (
		// <View style={styles.rootModal}>
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
				setModalVisible(!modalVisible);
			}}>
			<View style={styles.rootModal}>
				<View style={styles.modalView}>
					<Text
						style={styles.close}
						onPress={() => setModalVisible(!modalVisible)}>
						x
					</Text>
					<TitleContentContainer {...titleContentProps} />
					{withButtons && (
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={{
									...styles.button,
								}}
								onPress={() => setModalVisible(!modalVisible)}>
								<Text
									style={{
										...styles.buttonText,
										backgroundColor: "white",
									}}
									disabled={false}
									accessibilityLabel="assertions fetch functionality">
									no
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{ ...styles.button }}
								onPress={() => {
									ToastAndroid.showWithGravity(
										"Fetching affirmation...",
										ToastAndroid.SHORT,
										ToastAndroid.BOTTOM
									);
									onDataFetch();
									// setModalVisible(!modalVisible);
								}}>
								<Text
									style={{
										...styles.buttonText,
									}}
									disabled={false}
									accessibilityLabel="assertions fetch functionality">
									yes
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
		// </View>
	);
};

export default CustomModal;
