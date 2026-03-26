import React from "react";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";
import { JotaColors } from "../constants/JotaColors";

type Props = {
	text: string;
	onPressed: (event: GestureResponderEvent) => void;
};

const JotaButton = (props: Props) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				pressed ? styles.buttonPressed : styles.button,
			]}
			onPress={props.onPressed}
		>
			{({ pressed }) => (
				<Text
					style={[
						styles.buttonText,
						pressed ? styles.buttonTextPressed : styles.buttonText,
					]}
				>
					{props.text}
				</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonText: {
		color: JotaColors.text,
		fontSize: 16,
	},
	buttonTextPressed: {
		color: JotaColors.backgroundAlt,
		fontSize: 16,
	},
	button: {
		backgroundColor: JotaColors.button,
		textAlign: "center",
		borderWidth: 2,
		borderColor: JotaColors.border,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginBottom: 12,
	},
	buttonPressed: {
		backgroundColor: JotaColors.buttonPressed,
		textAlign: "center",
		borderWidth: 2,
		borderColor: JotaColors.border,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginBottom: 12,
	},
});

export default JotaButton;
