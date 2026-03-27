import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import JotaButton from "../src/components/JotaButton";
import JotaCheckBox from "../src/components/JotaCheckBox";
import JotaTextBox from "../src/components/JotaTextBox";
import { JotaColors } from "../src/constants/JotaColors";

export default function Index() {
	const [nome, setNome] = useState("");
	const [horasTrabalhadas, setHorasTrabalhadas] = useState(0);
	const [valorHora, setValorHora] = useState(0);
	const [valeTransporte, setValeTransporte] = useState(false);
	const [outrasDeducoes, setOutrasDeducoes] = useState(0);
	const [resultado, setResultado] = useState({
		bruto: 0,
		inss: 0,
		irpf: 0,
		vt: 0,
		liquido: 0,
	});
	const [exibirResultado, setExibirResultado] = useState(false);

	const calcularINSS = (salarioBruto: number) => {
		let impostoTotal = 0;
		const tetoINSS = 8157.41;
		const valorBase = Math.min(salarioBruto, tetoINSS);

		if (valorBase > 0) {
			const faixa1 = Math.min(valorBase, 1512.0);
			impostoTotal += faixa1 * 0.075;

			if (valorBase > 1512.0) {
				const faixa2 = Math.min(valorBase, 2793.88) - 1512.0;
				impostoTotal += faixa2 * 0.09;
			}

			if (valorBase > 2793.88) {
				const faixa3 = Math.min(valorBase, 4190.83) - 2793.88;
				impostoTotal += faixa3 * 0.12;
			}

			if (valorBase > 4190.83) {
				const faixa4 = Math.min(valorBase, 8157.41) - 4190.83;
				impostoTotal += faixa4 * 0.14;
			}
		}

		return impostoTotal;
	};

	const calcularIRPF = (salarioBruto: number, valorINSS: number) => {
		const baseCalculoReal = salarioBruto - valorINSS - outrasDeducoes;

		const descontoPadrao = 604.8;
		const baseCalculoSimplicada = salarioBruto - descontoPadrao;

		const baseIR = Math.min(baseCalculoReal, baseCalculoSimplicada);

		if (baseIR <= 2259.2) return 0;

		let irpf = 0;
		if (baseIR <= 2828.65) {
			irpf = baseIR * 0.075 - 169.44;
		} else if (baseIR <= 3751.05) {
			irpf = baseIR * 0.15 - 381.59;
		} else if (baseIR <= 4664.68) {
			irpf = baseIR * 0.225 - 662.77;
		} else {
			irpf = baseIR * 0.275 - 896.0;
		}

		return Math.max(0, irpf);
	};

	const calcularLiquido = () => {
		if (nome.trim() === "" || horasTrabalhadas <= 0 || valorHora <= 0) {
			if (Platform.OS === "web") {
				window.alert(
					"Por favor, preencha o nome, as horas e o valor hora corretamente.",
				);
			} else {
				Alert.alert(
					"Campos Incompletos",
					"Por favor, preencha o nome, as horas e o valor hora corretamente.",
					[{ text: "OK" }],
				);
			}

			return;
		}

		const bruto = valorHora * horasTrabalhadas;
		const inss = calcularINSS(bruto);
		const irpf = calcularIRPF(bruto, inss);
		const vt = valeTransporte ? bruto * 0.06 : 0;
		const liquido = bruto - inss - irpf - vt - outrasDeducoes;

		setResultado({ bruto, inss, irpf, vt, liquido });
		setExibirResultado(true);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />
			{!exibirResultado ? (
				<View style={styles.form}>
					<Text style={styles.titulo}>Calculo Trabalhista</Text>
					<JotaTextBox
						text="Nome:"
						placeholderText="Juciliano dos Pintos"
						numeric={false}
						onChange={(text) => setNome(text)}
					/>
					<JotaTextBox
						text="Horas Trabalhadas:"
						placeholderText="0"
						numeric={true}
						onChange={(text) => setHorasTrabalhadas(Number(text))}
					/>
					<JotaTextBox
						text="Valor Hora:"
						placeholderText="0"
						numeric={true}
						onChange={(text) => setValorHora(Number(text))}
					/>
					<JotaCheckBox
						text="Vale Transporte:"
						enabled={valeTransporte}
						onChange={(enabled) => setValeTransporte(enabled)}
					/>
					<JotaTextBox
						text="Outras Deduções:"
						placeholderText="0"
						numeric={true}
						onChange={(text) => setOutrasDeducoes(Number(text))}
					/>
					<JotaButton
						text="Calcular"
						onPressed={() => {
							calcularLiquido();
						}}
					/>
				</View>
			) : (
				<View style={styles.form}>
					<Text style={styles.titulo}>Resultado</Text>
					<Text style={styles.result}>Nome: {nome}</Text>
					<Text style={styles.result}>
						Salário Bruto: R${resultado.bruto.toFixed(2)}
					</Text>
					<Text style={styles.result}>
						INSS: -R${resultado.inss.toFixed(2)}
					</Text>
					<Text style={styles.result}>
						IRPF: -R${resultado.irpf.toFixed(2)}
					</Text>
					<Text style={styles.result}>
						Desconto Vale Transporte: R${resultado.vt.toFixed(2)}
					</Text>
					<Text style={styles.result}>
						Outras Deduções: R${outrasDeducoes.toFixed(2)}
					</Text>
					<Text style={styles.result}>
						Líquido: R${resultado.liquido.toFixed(2)}
					</Text>
					<JotaButton
						text="Voltar"
						onPressed={() => {
							setExibirResultado(false);
							setNome("");
							setHorasTrabalhadas(0);
							setValorHora(0);
							setOutrasDeducoes(0);
							setValeTransporte(false);
						}}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	// CONTAINERS
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: JotaColors.background,
	},
	form: {
		width: "30%",
		minWidth: 400,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: JotaColors.backgroundAlt,
		borderWidth: 2,
		borderColor: JotaColors.border,
		borderRadius: 10,
	},
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},

	// TEXTOS
	titulo: {
		color: JotaColors.text,
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
	},
	result: {
		color: JotaColors.text,
		fontSize: 16,
		marginBottom: 10,
	},
});
