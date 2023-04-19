import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./WelcomeScreen";
import React from "react";
import SignUpEmail from "./signup/SignUpEmail";
import SignInEmail from "./SignInEmail";
import SignUpPassword from "./signup/SignUpPassword";

const OnboardingStack = createStackNavigator();

const OnboardingNavigator: React.FC<any> = () => {
    return (
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
    );
}

export default OnboardingNavigator;