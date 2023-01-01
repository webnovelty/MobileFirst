import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import React from "react";
import {
	Image, StyleSheet, TouchableOpacity, View
} from 'react-native';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();


import { useDispatch } from 'react-redux';
import LoginScreen from './components/Screens/auth/LoginScreen';
import RegistrationScreen from './components/Screens/auth/RegistrationScreen';
import CreatePostsScreen from './components/Screens/home/CreatePostsScreen';
import PostsScreen from './components/Screens/home/PostsScreen';
import ProfileScreen from './components/Screens/home/ProfileScreen';
import { authSignOutUser } from './redux/auth/authOperations';



const AuthScreen = () => {

	return <AuthStack.Navigator>
		<AuthStack.Screen
			options={{ headerShown: false, }}
			name="Register"
			component={RegistrationScreen} />
		<AuthStack.Screen
			options={{ headerShown: false, }}
			name="Login"
			component={LoginScreen} />
	</AuthStack.Navigator>

};



const HomeScreen = () => {
	const dispatch = useDispatch();
	const signOut = () => {
		dispatch(authSignOutUser());
	}

	return (

		<MainTab.Navigator
			screenOptions={{
				"tabBarShowLabel": false,
				"tabBarStyle": [
					{
						"display": "flex"
					},
					null
				]
			}}>
			<MainTab.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity
							style={styles.btn}
							activeOpacity={0.8}
							onPress={signOut}>
							<Image
								style={styles.logOut}
								source={require('./assets/images/tabs/log-out.png')}
							/>
						</TouchableOpacity>
					),
					tabBarIcon: ({ focused }) => (
						<View style={focused}>
							<Image
								source={require('./assets/images/tabs/grid.png')}
							/>

						</View>
					),
					headerShown: true,
				}}
				name="Публикации"
				component={PostsScreen} />
			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={focused}>
							<Image
								source={require('./assets/images/tabs/new.png')}
							/>

						</View>
					),
				}}
				name="Создать публикацию"
				component={CreatePostsScreen} />
			<MainTab.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity
							style={styles.btn}
							activeOpacity={0.8}
							onPress={signOut}>
							<Image
								style={styles.logOut}
								source={require('./assets/images/tabs/log-out.png')}
							/>
						</TouchableOpacity>
					),
					tabBarIcon: ({ focused }) => (
						<View style={focused}>
							<Image
								source={require('./assets/images/tabs/user.png')}
							/>

						</View>
					),
				}}
				name="Профиль"
				component={ProfileScreen} />
		</MainTab.Navigator>
	)
};

export const useRoute = isAuth => {
	if (!isAuth) {
		return <AuthScreen />;
	}
	return <HomeScreen />;
};


const styles = StyleSheet.create({
	logOut: {
		marginRight: 10,

	},
})