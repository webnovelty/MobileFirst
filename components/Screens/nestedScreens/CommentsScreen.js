import { useState } from 'react';
import {
	Image, StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';

const initialState = {
	comment: "",
};


export default function CommentsScreen({ route }) {


	const handleSubmit = () => {

		setState(initialState)
	}

	const [state, setState] = useState(initialState);
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View styles={styles.img}>
					<Image
						source={{ uri: route.params.photo }}
						style={styles.photo}
					/>
				</View>
				<View style={styles.middle}>

				</View>
				<View style={styles.form}>

					<TextInput
						backgroundColor="#F6F6F6"
						placeholder="Комментарий"
						style={styles.input}
						textAlign={"center"}
						value={state.comment}
						onChangeText={(value) => setState((prevState) => ({ ...prevState, login: value }))}
					/>
					<View style={styles.btn}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={handleSubmit}>
							<Image style={styles.img}

								source={require('../../../assets/images/Send.png')}
							/>
						</TouchableOpacity>
					</View>

				</View>


			</View>
		</View>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: "center",


	},
	blockMain: {
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: 'flex-end',
	},
	input: {
		width: 250,
		marginHorizontal: 16,
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
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "center",
		backgroundColor: "white",
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
		width: 34,
		height: 34,
		border: 1,
		borderRadius: 100,
		height: 51,
		justifyContent: 'center',
		alignItems: "center",
	},
	btnTitle: {
		color: "#fff",
		fontSize: 16,
		fontFamily: "RubikBubbles-Regular",

	},
	top: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	link: {
		textAlign: "center",
		color: "#1B4371",
		fontSize: 16,
		lineHeight: 19,
		fontFamily: "RubikBubbles-Regular",

	},
	photo: {
		justifyContent: "center",
		width: 343,
		height: 240,
		borderWidth: 1,
		borderColor: "#000"
	},
	img: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	info: {
		marginVertical: 32,
	},
	name: {
		fontWeight: "bold",
		fontSize: 30,
		lineHeight: 35,
	},
	middle: {
		height: 300,
	}
});
