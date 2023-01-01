import {
	Image,
	ImageBackground,
	StyleSheet, Text, View
} from 'react-native';

export default function ProfileScreen({ route }) {

console.log(route.params);

	return (
		<View style={styles.container}>

			<ImageBackground
				style={styles.image}
				source={require("../../../assets/images/backHW.png")}>


				<View style={styles.form}>

					<View style={styles.blockMain}>
						<Image style={styles.img}

							source={require('../../../assets/images/User.jpg')}
						/>
						<View style={styles.info}>
							<Text style={styles.name}>Natalie Romanova</Text>
						</View>

					</View>

					{route.params?.photo && (<View>
						<Image
							source={{ uri: route.params.photo }}
							style={styles.photo}
						/>
					</View>)}

				</View>
			</ImageBackground>


		</View>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',


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

	},
	photo: {
		justifyContent: "center",
		width: 343,
		height: 240,
		borderWidth: 1,
		borderColor: "#000"
	},
	img: {
		height: 120,
		width: 120,
	},
	info: {
		marginVertical: 32,
	},
	name: {
		fontWeight: "bold",
		fontSize: 30,
		lineHeight: 35,
	}
});
