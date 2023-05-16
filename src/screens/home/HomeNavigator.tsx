import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./HomeScreen";
import TourScreen from "./tours/TourScreen";
import TourConfirmationScreen from "./tours/TourConfirmationScreen";

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC<any> = ({navigation}) => {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Welcome"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="Tours"
                component={TourScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="TourConfirmation"
                options={{ headerShown: false }}
            >
                {(props) => (
                    <TourConfirmationScreen {...props} tabNavigation={navigation} />
                )}
            </HomeStack.Screen>
        </HomeStack.Navigator>
    );
}

export default HomeNavigator;
