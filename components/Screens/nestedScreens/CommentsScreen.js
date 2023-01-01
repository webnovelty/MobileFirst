import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/config';




export default function CommentsScreen({ route }) {



	const { id } = route.params;
	const [comment, setComment] = useState('');
	const { login } = useSelector(state => state.auth)
	const [allComments, setAllComments] = useState([]);


	useEffect(() => {
		getAllComments();
	}, [getAllComments]);



	const uploadCommentToServer = async () => {
		await addDoc(collection(db, `posts/${id}/comments`), {
			comment,
			login,
		});
		setComment('');
	};

	const getAllComments = async () => {
		const data = await getDocs(collection(db, `posts/${id}/comments`));
		const comments = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
		setAllComments(comments);
	};

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
					{allComments && (
						<SafeAreaView>
							<FlatList
								data={allComments}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<View>
										<Text>{item.login}</Text>
										<View>
											<Text>{item.comment}</Text>
										</View>
									</View>
								)}
							/>
						</SafeAreaView>
					)}
				</View>
				<View style={styles.form}>

					<TextInput
						placeholder="Комментарий"
						style={styles.commentInput}
						value={comment}
						onChangeText={value => setComment(value)}
					/>
					<View style={styles.btn}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={uploadCommentToServer}>
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
