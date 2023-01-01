import { NavigationContainer } from '@react-navigation/native';
import {
	getAuth
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../redux/auth/authOperations';
import { useRoute } from '../router';



const auth = getAuth();


const Main = () => {
	const { stateChange } = useSelector(state => state.auth);
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(authStateChangeUser());
	}, []);


	auth.onAuthStateChanged(user => {
		setUser(user);
	});
	const routing = useRoute(stateChange)


	return (
		<NavigationContainer style={{ backgroundColor: "#fff" }}>
			{routing}
		</NavigationContainer>
	);
}

export default Main;