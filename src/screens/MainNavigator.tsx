
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {faHome, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import HomeScreen from "./home/HomeScreen";
import WalletScreen from "./WalletScreen";
import ProfileScreen from "./ProfileScreen";
import HomeNavigator from "./home/HomeNavigator";

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC<any> = () => {
    return (
        <Tab.Navigator initialRouteName={"Home"} screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { height: 52 },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = faHome;

                if (route.name === 'Wallet') {
                    iconName = faWallet;
                } else if (route.name === 'Profile') {
                    iconName = faUser;
                }

                return <FontAwesomeIcon color={focused ? '' : 'gray'} size={25} icon={iconName}/>
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen name="Home" component={HomeNavigator}/>
            <Tab.Screen name="Wallet" component={WalletScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

export default MainNavigator;
