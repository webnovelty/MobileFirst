import { Feather } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from '../../../firebase/config';

const Home = ({ route, navigation }) => {
	const [posts, setPosts] = useState([]);
	const getAllPosts = async () => {
		const data = await getDocs(collection(db, 'posts'));
		const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
		setPosts(posts);
	};


	useEffect(() => {
		getAllPosts();
	}, [getAllPosts]);

	return (

		<View style={styles.container}>
			<View style={styles.blockMain}>
				<Image style={styles.img}

					source={require('../../../assets/images/User.jpg')}
				/>
				<View style={styles.info}>
					<Text style={styles.name}>Natalie Romanova</Text>
					<Text>email@example.com</Text>
				</View>

			</View>
			{!posts && <Text style={styles.postNo}>Еще нет не одного поста :(</Text>}
			<FlatList
				data={posts}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					
					
					return (
						<View style={styles.block}>
							<TouchableOpacity
								title="Comments"
								onPress={() =>
									navigation.navigate('Комментарии', item)
								}
							>
								<View>
									<Image
										source={{ uri: item.photo }}
										style={styles.photo}
									/>
								</View>
							</TouchableOpacity>
							<View style={styles.blockLable}>
								<Text>{item.photoName}</Text>

								
									<TouchableOpacity
										title="Map"
										onPress={() =>
											navigation.navigate('Карта', item)
										}
									>
										<View style={styles.geo}>
											<Feather name="map-pin" size={24} color="#ff8c00" />
											<Text style={styles.textGeo}>{item.photoPlace}</Text>
										</View>
									</TouchableOpacity>
								
							</View>
						</View>
					)
				}} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",

	},
	blockMain: {

		flexDirection: "row",
		margin: 15,



	},
	blockLable: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 15,

	},
	block: {

		flexDirection: "column",
		margin: 15,


	},
	img: {
		justifyContent: "center",
		borderRadius: 25,

	},
	info: {
		flex: 1,
		flexDirection: "column",
		marginVertical: 15,
		marginLeft: 10,

	},
	name: {
		fontWeight: "bold",
		fontSize: 13,
		lineHeight: 15,


	},
	nameComment: {
		fontWeight: "bold",
		fontSize: 16,
		lineHeight: 19,
		color: "#212121"
	},
	photo: {
		justifyContent: "center",
		width: 343,
		height: 240,
		borderWidth: 1,
		borderColor: "#000"
	},
	geo: {

		flexDirection: "row",
	},
	textGeo: {
		marginRight: 25,
		marginLeft: 5,
	},
	postNo: {
		textAlign: "center",
		fontSize: 20,
	}
});

export default Home;