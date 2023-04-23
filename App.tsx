import { StatusBar } from 'expo-status-bar';
import {
    Alert,
    Image,
    ImageBackground, Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, Touchable,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {faHome, faMagnifyingGlass, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import tw from 'twrnc';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import React, {useCallback, useEffect, useState} from "react";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from 'react-native';
import {SvgUri} from 'react-native-svg';
import HomeScreen from "./src/screens/HomeScreen";
import {ActiveScreen} from "./src/utils/ActiveScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import WalletScreen from "./src/screens/WalletScreen";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import OnboardingNavigator from "./src/screens/onboarding/OnboardingNavigator";
import MainNavigator from "./src/screens/MainNavigator";
import { UserContext } from './src/context/UserContext';
const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [screen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.HOME);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    bold: require('./assets/fonts/bold.ttf'),
                    extra_bold: require('./assets/fonts/extra_bold.ttf'),
                    light: require('./assets/fonts/light.ttf'),
                    medium: require('./assets/fonts/medium.ttf'),
                    regular: require('./assets/fonts/regular.ttf'),
                    semi_bold:  require('./assets/fonts/semi_bold.ttf'),
                });

                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const hideSplashScreen = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    useEffect(() => {
        hideSplashScreen();
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <NavigationContainer>
                {user !== null ? <MainNavigator /> : <OnboardingNavigator />}
            </NavigationContainer>
        </UserContext.Provider>
    );
}
