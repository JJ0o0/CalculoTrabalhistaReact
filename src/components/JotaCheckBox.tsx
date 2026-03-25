import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
};

const JotaCheckBox = (props: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{props.text}</Text>
      <Checkbox
        style={styles.checkbox}
        value={props.enabled}
        onValueChange={props.onChange}
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
  checkbox: {
    margin: 10,
  },
});

export default JotaCheckBox;
