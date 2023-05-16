import React, {useContext, useRef} from "react";
import {
    Alert,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faHome,
    faMagnifyingGlass,
    faUser,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from "@react-navigation/native";
import ConfettiCannon from 'react-native-confetti-cannon';
import {OnboardingContext} from "../context/OnboardingContext";
import Toast from "react-native-toast-message";

const SignUpFirstName: React.FC<any> = ({navigation}) => {

    const onboardingContext = useContext(OnboardingContext);

    if (!onboardingContext)
        throw new Error('SignUpFirstName must be rendered within an OnboardingContext.Provider');

    const { onboardedUser, setOnboardedUser } = onboardingContext;

    const viewRef = useRef<Animatable.View & View>(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow bg-white"}>
            <ScrollView className={"h-screen flex flex-grow mx-5"} stickyHeaderIndices={[0]}>
                <TouchableOpacity onPress={() => navigation.goBack()} className={"mt-5 flex flex-row justify-center items-center w-10 h-10 bg-gray-200 rounded-full"}>
                    <View className={"font-extra_bold"}>
                        <FontAwesomeIcon size={14} icon={faChevronLeft}/>
                    </View>
                </TouchableOpacity>
                <Text className="mt-10 font-bold text-4xl">
                    What's your first name?
                </Text>
                <TextInput
                    className={"mt-10 text-xl font-medium"}
                    onChangeText={(text) => setOnboardedUser({
                        ...onboardedUser,
                        firstName: text
                    })}
                    value={onboardedUser.firstName}
                    placeholder="First Name"
                />
                <View className={"mt-10 w-full flex flex-row justify-center items-center"}>
                    <TouchableOpacity className={"flex flex-row items-center justify-center w-48 h-14 rounded-xl bg-[#FC4C02]"} onPress={() => {
                        if(onboardedUser.firstName.length <= 1) {
                            Toast.show({
                                type: 'error',
                                text1: 'Invalid first name',
                                text2: 'First name should be longer!'
                            });
                            Vibration.vibrate();
                            return;
                        }

                        navigation.push("SignUpLastName")
                    }}>
                        <Text className="font-bold text-xl text-white">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default SignUpFirstName;
