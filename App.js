import { useEffect} from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { store } from './redux/store';


export default function App() {



	const [fontsLoaded] = useFonts({
		"RubikBubbles-Regular": require("./assets/fonts/RubikBubbles-Regular.ttf")
	});

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}

		prepare();
	}, []);


	if (!fontsLoaded) {
		return null
	}
	else {
		SplashScreen.hideAsync()
	}



	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
