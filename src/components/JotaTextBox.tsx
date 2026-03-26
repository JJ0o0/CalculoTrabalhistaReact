import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";
import { JotaColors } from "../constants/JotaColors";

type Props = {
	text: string;
	placeholderText: string;
	numeric: boolean;
	onChange: (event: string) => void;
};

const JotaTextBox = (props: Props) => {
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.inputText}>{props.text}</Text>
			<TextInput
				style={styles.input}
				placeholder={props.placeholderText}
				placeholderTextColor={JotaColors.placeholder}
				keyboardType={props.numeric ? "numeric" : "default"}
				onChangeText={props.onChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},
	inputText: {
		color: JotaColors.text,
		fontSize: 16,
	},
	input: {
		color: JotaColors.text,

		textAlign: "center",
		borderWidth: 2,
		borderColor: JotaColors.border,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginBottom: 12,
	},
});

export default JotaTextBox;
