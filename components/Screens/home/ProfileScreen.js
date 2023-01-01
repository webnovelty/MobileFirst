import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../firebase/config';

import {
	View,
	Text,
	ImageBackground,
	Image,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from 'react-native';

import {
	MaterialIcons,
	MaterialCommunityIcons,
	EvilIcons,
} from '@expo/vector-icons';

export default function ProfileScreen({ route }) {

	const { userId, login } = useSelector(state => state.auth);
	const [profilePosts, setProfilePosts] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		getAllProfilePosts();
	}, [getAllProfilePosts]);

	const getAllProfilePosts = async () => {
		const data = await getDocs(
			query(collection(db, 'posts'), where('userId', '==', userId))
		);
		const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
		setProfilePosts(posts);
	};


	return (
		<View style={styles.containerProfile}>
			<ImageBackground
				style={styles.image}
				source={require('../../../assets/images/backHW.png')}
			>
				<View style={styles.containerViewProfile}>
				
					<View style={styles.titleProfile}>
						<Text style={styles.profileTitle}>{login}</Text>
					</View>
					{profilePosts && (
						<FlatList
							data={profilePosts}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<View style={styles.postWrapper}>
									<View style={styles.imageWrapper}>
										<Image source={{ uri: item.photo }} style={styles.image} />
									</View>
									<View style={styles.potoWrapper}>
										<Text>{item.photoCaption}</Text>
									</View>
									<View style={styles.btnWrapper}>
										<TouchableOpacity
											activeOpacity={0.8}
											onPress={() =>
												navigation.navigate('Comments', { postId: item.id })
											}
										>
											<EvilIcons name="comment" size={25} color="#BDBDBD" />
										</TouchableOpacity>
										<TouchableOpacity
											activeOpacity={0.8}
											onPress={() =>
												navigation.navigate('Map', {
													location: item.photoLocation,
												})
											}
										>
											<MaterialCommunityIcons
												name="map-marker"
												size={25}
												color="#BDBDBD"
											/>
										</TouchableOpacity>
									</View>
								</View>
							)}
						/>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};


export const styles = StyleSheet.create({

	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},

	containerProfile: {
		flex: 1,
	},

	containerViewProfile: {
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 10,
		paddingTop: 85,
		paddingBottom: 10,
		maxHeight: '70%',
	},
	profileTitle: {
		fontSize: 30,
		alignItems: 'center',
	},
	titleProfile: {
		alignItems: 'center',
		marginBottom: 30,
	},

	imageWrapper: {
		borderRadius: 8,
		marginBottom: 8,
	},
	postWrapper: {
		marginBottom: 20,
	},
	btnWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	potoWrapper: {
		marginBottom: 10,
	},
});