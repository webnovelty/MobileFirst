import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
	ImageBackground, Keyboard, KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native';

import { useDispatch } from 'react-redux';
import { authSignInUser } from '../../../redux/auth/authOperations';

const initialState = {
	email: "",
	password: "",
};

export default function LoginScreen({navigation}) {
	const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
	const [state, setState] = useState(initialState);
	const dispatch = useDispatch()

	const handleSubmit = () => {
		setIsShowKeyBoard(false)
		Keyboard.dismiss()
		dispatch(authSignInUser(state))
		setState(initialState)
	}



	return (
		<TouchableWithoutFeedback onPress={handleSubmit}>
		
				<View style={styles.container}>

					<ImageBackground
						style={styles.image}
					source={require("../../../assets/images/backHW.png")}>
						<KeyboardAvoidingView
							behavior={Platform.OS === "ios" ? "padding" : ""}>
							<View style={{ ...styles.form, paddingBottom: isShowKeyBoard ? 20 : 78 }}>
								<Text style={styles.headText}>Войти</Text>
								<View>
									<TextInput
										backgroundColor="#F6F6F6"
										placeholder="Адрес электронной почты"
										style={styles.input}
										textAlign={"center"}
										value={state.email}
										onFocus={() => setIsShowKeyBoard(true)}
										onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
									/>
									<TextInput
										backgroundColor="#F6F6F6"
										placeholder="Пароль"
										style={styles.input}
										textAlign={"center"}
										value={state.password}
										secureTextEntry={true}
										onFocus={() => setIsShowKeyBoard(true)}
										onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
									/>
								</View>
								<TouchableOpacity
									style={styles.btn}
									activeOpacity={0.8}
									onPress={handleSubmit}>
									<Text
										style={styles.btnTitle}>Войти</Text>
								</TouchableOpacity>


								<View>
									<TouchableOpacity

										activeOpacity={0.8}
										onPress={() => navigation.navigate("Register")}
									>
										<Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
									</TouchableOpacity>
								</View>


							</View>
						</KeyboardAvoidingView>
						<StatusBar style="auto" />
					</ImageBackground>


				</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',


	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: 'flex-end',
	},
	input: {
		fontFamily: "RubikBubbles-Regular",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		height: 50,
		borderRadius: 8,
		color: "#BDBDBD",
		background: "#F6F6F6",
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 16,
	},
	form: {

		backgroundColor: "white",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,


	},
	headText: {
		fontFamily: "RubikBubbles-Regular",
		color: "#212121",
		marginVertical: 32,
		fontSize: 30,
		lineHeight: 35,
		textAlign: "center",
	},
	btn: {
		backgroundColor: "#FF6C00",
		border: 1,
		borderRadius: 100,
		margin: 16,
		height: 51,
		justifyContent: 'center',
		alignItems: "center",
	},
	btnTitle: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "RubikBubbles-Regular",

	},
	avatar: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	link: {
		textAlign: "center",
		color: "#1B4371",
		fontSize: 16,
		lineHeight: 19,
		fontFamily: "RubikBubbles-Regular",

	}
});
