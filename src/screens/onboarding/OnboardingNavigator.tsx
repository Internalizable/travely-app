import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./WelcomeScreen";
import React, {useState} from "react";
import SignUpEmail from "./signup/SignUpEmail";
import SignInEmail from "./signin/SignInEmail";
import SignUpPassword from "./signup/SignUpPassword";
import { OnboardingContext } from './context/OnboardingContext';
import SignInPassword from "./signin/SignInPassword";

const OnboardingStack = createStackNavigator();

interface IOnboardedUser {
    email: string,
    password: string
}

const OnboardingNavigator: React.FC<any> = () => {

    const [onboardedUser, setOnboardedUser] = useState<IOnboardedUser>({ email: '', password: '' });

    return (
        <OnboardingContext.Provider value={{ onboardedUser, setOnboardedUser }}>
            <OnboardingStack.Navigator>
                <OnboardingStack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <OnboardingStack.Screen
                    name="SignInEmail"
                    component={SignInEmail}
                    options={{ headerShown: false }}
                />
                <OnboardingStack.Screen
                    name="SignInPassword"
                    component={SignInPassword}
                    options={{ headerShown: false }}
                />
                <OnboardingStack.Screen
                    name="SignUpEmail"
                    component={SignUpEmail}
                    options={{ headerShown: false }}
                />
                <OnboardingStack.Screen
                    name="SignUpPassword"
                    component={SignUpPassword}
                    options={{ headerShown: false }}
                />
            </OnboardingStack.Navigator>
        </OnboardingContext.Provider>
    );
}

export default OnboardingNavigator;
