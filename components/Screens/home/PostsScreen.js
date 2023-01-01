import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import Home from "../nestedScreens/Home";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
	return (
		<NestedScreen.Navigator screenOptions={{
			headerShown: false,
		}}
		>
			<NestedScreen.Screen

				name="Home"
				component={Home}
			/>
			<NestedScreen.Screen name="Комментарии" component={CommentsScreen} />
			<NestedScreen.Screen name="Карта" component={MapScreen} />
		</NestedScreen.Navigator>
	);
};



export default PostsScreen;