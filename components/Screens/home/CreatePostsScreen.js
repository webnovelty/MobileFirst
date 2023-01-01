import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from "react";
import {
	Image, StyleSheet, Text,
	TextInput,
	TouchableOpacity, View
} from "react-native";
import { useSelector } from 'react-redux';
import { db, storage } from '../../../firebase/config';

const initialState = {
	name: "",
	map: "",
};



export default function CreatePostsScreen({ navigation }) {
	const [camera, setCamera] = useState(null)
	const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
	const [state, setState] = useState(initialState);
	const [photo, setPhoto] = useState("")
	const [location, setLocation] = useState(null);
	const [hasCamPermission, setHasCamPermission] = useState(false);
	const [hasLocationPermission, setHasLocationPermission] = useState(false);
	const stateScreen = useSelector(state => state.auth);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasCamPermission(status === 'granted');

			const locationStatus = await Location.requestForegroundPermissionsAsync();
			if (locationStatus.status) {
				setHasLocationPermission(locationStatus.status === 'granted');
			}
		})();
	}, []);


	const takePhoto = async () => {
		const photo = await camera.takePictureAsync();
		const currentLocation = await Location.getCurrentPositionAsync({});
		setLocation(currentLocation.coords);
		setPhoto(photo.uri)
	}

	const sendPhoto = async () => {
		uploadPostServer()
		console.log("stateScreen",stateScreen)
		navigation.navigate("Home")
		setState(initialState)
		setPhoto("");

	}

	const uploadPhotoServer = async () => {
		console.log(photo)
		const response = await fetch(photo)
		const file = await response.blob()
		const photoId = Date.now().toString();
		const imageRef = ref(storage, `images/${photoId}`);
		await uploadBytes(imageRef, file);
		const data = await getDownloadURL(imageRef);
		console.log(data)
		return data;
	};

	const uploadPostServer = async () => {
		const photo = await uploadPhotoServer();
		const currentLocation = await Location.getCurrentPositionAsync({});
		const docRef = await addDoc(collection(db, 'posts'), {
			photo,
			photoLocation: currentLocation.coords,
			photoPlace: state.map,
			photoName: state.name,
			userId: stateScreen.userId,
			login: stateScreen.login,
		});
	};

	if (hasCamPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} ref={setCamera}>
				{photo && (<View style={styles.takePhotoContainer}>
					<Image source={{ uri: photo }} style={{
						height: 150,
						width: 150,
					}} />
				</View>)}

				<TouchableOpacity onPress={takePhoto}>
					<Image
						style={styles.snap}
						source={require('../../../assets/images/photo.png')}
					/>
				</TouchableOpacity>

			</Camera>
			<TouchableOpacity
				style={styles.upload}
				activeOpacity={0.8}
				onPress={() => { }}
			>
				<Text
					style={styles.btnTitle}>Загрузите фото</Text>
			</TouchableOpacity>
			<View style={styles.form}>
				<View>
					<TextInput
						placeholder="  Название..."
						style={styles.input}
						value={state.name}
						onFocus={() => setIsShowKeyBoard(true)}
						onChangeText={(value) => setState((prevState) => ({ ...prevState, name: value }))}
					/>
					<TextInput
						placeholder="  Местность"
						style={styles.input}
						value={state.map}
						onFocus={() => setIsShowKeyBoard(true)}
						onChangeText={(value) => setState((prevState) => ({ ...prevState, map: value }))}
					/>
				</View>
				<TouchableOpacity
					style={styles.btn}
					activeOpacity={0.8}
					onPress={sendPhoto}
				>
					<Text
						style={styles.btnTitle}>Опубликовать</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={takePhoto}>
				<Image
					style={styles.trash}
					source={require('../../../assets/images/trash.png')}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: "#fff"
	},
	camera: {
		height: 240,
		alignItems: "center",
	},
	snap: {
		width: 60,
		height: 60,
		marginTop: 90,
	},
	input: {
		fontFamily: "RubikBubbles-Regular",
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		height: 50,
		color: "#000",
		fontSize: 16,
		lineHeight: 19,
		marginBottom: 16,
	},
	form: {
		flex: 1,
		marginTop: 32,


	},
	btn: {
		marginTop: 16,
		backgroundColor: "#F6F6F6",
		border: 1,
		borderRadius: 100,
		marginHorizontal: 16,
		height: 51,
		justifyContent: 'center',
		alignItems: "center",
	},
	btnTitle: {
		color: "#BDBDBD",
		fontSize: 16,
		fontFamily: "RubikBubbles-Regular",

	},
	upload: {
		marginTop: 8,
	},
	trash: {
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 34,
	},
	takePhotoContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		borderColor: "#fff",
		borderWidth: 1,
	}
})