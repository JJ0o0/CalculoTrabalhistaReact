import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import JotaCheckBox from "../src/components/JotaCheckBox";
import JotaTextBox from "../src/components/JotaTextBox";

export default function Index() {
  const [nome, setNome] = useState();
  const [horasTrabalhadas, setHorasTrabalhadas] = useState(0);
  const [valorHora, setValorHora] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const [valeTransporte, setValeTransporte] = useState(false);
  const [outrasDeducoes, setOutrasDeducoes] = useState(0);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.subcontainer}>
        <Text style={styles.titulo}>Calculo Trabalhista</Text>
        <JotaTextBox
          text="Nome:"
          placeholderText="Juciliano dos Pintos"
          numeric={false}
          onChange={() => {
            setNome;
          }}
        />
        <JotaTextBox
          text="Horas Trabalhadas:"
          placeholderText="0"
          numeric={true}
          onChange={() => {
            setHorasTrabalhadas;
          }}
        />
        <JotaTextBox
          text="Valor Hora:"
          placeholderText="0"
          numeric={true}
          onChange={() => {
            setValorHora;
          }}
        />
        <JotaTextBox
          text="Dependentes:"
          placeholderText="0"
          numeric={true}
          onChange={() => {
            setDependentes;
          }}
        />
        <JotaCheckBox
          text="Vale Transporte:"
          enabled={valeTransporte}
          onChange={setValeTransporte}
        />
        <JotaTextBox
          text="Outras Deduções:"
          placeholderText="0"
          numeric={true}
          onChange={() => {
            setOutrasDeducoes;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINERS
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a4f",
  },
  subcontainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#323268",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  // TEXTOS
  titulo: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputText: {
    color: "white",
    fontSize: 16,
  },

  // ELEMENTOS
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
  checkbox: {
    margin: 8,
  },
});
