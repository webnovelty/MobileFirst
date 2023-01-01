import { View} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
	const coordinate = route.params.photoLocation;
	const title = route.params.photoPlace;

	console.log(route.params);
	

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: coordinate.latitude,
					longitude: coordinate.longitude,
					latitudeDelta: 0.08,
					longitudeDelta: 0.03,
				}}
			>
				<Marker
					coordinate={{
						latitude: coordinate.latitude,
						longitude: coordinate.latitude,
					}}
					title={title}
				/>
			</MapView>
		</View>
	);
};