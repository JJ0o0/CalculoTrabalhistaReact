import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  text: string;
  placeholderText: string;
  numeric: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const JotaTextBox = (props: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{props.text}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholderText}
        placeholderTextColor="#999999"
        keyboardType={props.numeric ? "numeric" : "default"}
        onChange={() => {
          props.onChange;
        }}
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
    color: "white",
    fontSize: 16,
  },
  input: {
    color: "white",

    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 12,
  },
});

export default JotaTextBox;
