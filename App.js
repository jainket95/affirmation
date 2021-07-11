import React, { useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Header from "./components/layout/Header";
import TitleContentContainer from "./containers/TitleContentContainer";
import CustomModal from "./containers/CustomModal";
import TestModule from "./containers/TestModal";
import TestModal from "./containers/TestModal";

const initialData = [
	{
		id: "0",
		heading: "Introduction",
		content:
			"Affirmations are positive statements that can help you to challenge and overcome self-sabotaging and negative thoughts. You can use this overly-convoluted tool to fetch an affirmation for joy and positive change.",

		buttonText: false,
		designType: "normal",
		disabled: false,
	},
	{
		id: "1",
		heading: "Step 1: Fetch",
		content:
			"Click the button below to make a request to a remote api and fetch and affirmation.",
		buttonText: "fetch",
		designType: "normal",
		disabled: false,
	},
	{
		id: "2",
		heading: "Step 2: Display",
		content:
			"Click the button below to below to display the most recently fetched affirmation.",
		buttonText: "display",
		designType: "normal",
		disabled: true,
	},
];

const initialCustomModalState = {
	heading: "fetch?",
	content: "Are you sure do you want to fetch new Affirmation?",
	designType: "modal",
	withButtons: true,
	cycle: "fetch",
};

export default function App() {
	// const [fontsLoaded, setFontsLoaded] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [affirmation, setAffirmation] = useState({
		heading: "fetch?",
		content: "Are you sure do you want to fetch new Affirmation?",
		designType: "modal",
		withButtons: true,
		cycle: "fetch",
	});
	// const [initialData, setInitialData] = useState(data);

	// let [fontsLoaded] = useFonts({
	// 	Roboto: require("./assets/fonts/Roboto-Bold.ttf"),
	// });

	// if (!fontsLoaded) {
	// 	return <AppLoading />;
	// }

	const renderItem = ({ item }) => (
		<TitleContentContainer
			key={item.id}
			heading={item.heading}
			// disabled={item.disabled}
			content={item.content}
			buttonText={item.buttonText}
			designType={item.designType}
			onHandleClick={(buttonText) => {
				console.log(buttonText, affirmation);

				if (
					buttonText === "display" &&
					!(
						affirmation.heading === "affirmation" &&
						affirmation.cycle === "display"
					)
				) {
					{
						ToastAndroid.showWithGravity(
							"Please first fetch the affirmation!",
							ToastAndroid.SHORT,
							ToastAndroid.BOTTOM
						);
					}
				}
				if (buttonText === "fetch") { 
					affirmation.heading = initialCustomModalState.heading;
					affirmation.content = initialCustomModalState.content;
					affirmation.withButtons = initialCustomModalState.withButtons;
					affirmation.cycle = initialCustomModalState.cycle;

					setAffirmation(affirmation);
					setModalVisible(!modalVisible);
				} else if (
					affirmation.heading === "affirmation" &&
					affirmation.cycle === "display"
				) {
					setModalVisible(!modalVisible);
				}
			}}
		/>
	);

	const getAffirmation = async () => {
		const res = await fetch("https://www.affirmations.dev/");
		const affirmationData = await res.json();

		console.log(affirmationData);

		return affirmationData.affirmation;
	};

	console.log(modalVisible);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Header />
			<View style={styles.contentContainer}>
				<SafeAreaView>
					<FlatList
						data={initialData}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
			<CustomModal
				titleContentProps={{
					heading: affirmation.heading,
					content: affirmation.content,
					designType: "modal",
				}}
				withButtons={affirmation.withButtons}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				onDataFetch={async () => {
					const affirmationData = await getAffirmation();

					const newAffirmation = {
						heading: "affirmation",
						content: affirmationData,
						designType: "modal",
						withButtons: false,
						cycle: "display",
					};

					affirmation.heading = newAffirmation.heading;
					affirmation.content = newAffirmation.content;
					affirmation.withButtons = newAffirmation.withButtons;
					affirmation.cycle = newAffirmation.cycle;

					// const new

					setAffirmation(affirmation);
					setModalVisible(!modalVisible);
				}}
			/>
		</View>
	);
	// }
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		flex: 1,
		marginTop: 35,
		fontFamily: "Roboto",
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	contentContainer: {
		width: "100%",
		height: "60%",
		flex: 1,
		marginTop: 10,
		fontFamily: "Roboto",
		backgroundColor: "#fff",
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
});
