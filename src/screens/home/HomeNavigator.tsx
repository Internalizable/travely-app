import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./HomeScreen";
import TourScreen from "./tours/TourScreen";

const HomeStack = createStackNavigator();

const HomeNavigator: React.FC<any> = () => {

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
        </HomeStack.Navigator>
    );
}

export default HomeNavigator;
