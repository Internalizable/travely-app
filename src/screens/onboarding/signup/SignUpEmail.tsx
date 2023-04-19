import React, {useRef} from "react";
import {
    Alert,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
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

const SignUpEmail: React.FC<any> = ({navigation}) => {

    const [email, onChangeEmail] = React.useState('');

    const viewRef = useRef<Animatable.View & View>(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow bg-white"}>
            <ScrollView className={"h-screen flex flex-grow mx-5"} stickyHeaderIndices={[0]}>
                <TouchableOpacity onPress={() => navigation.goBack()} className={"flex flex-row justify-center items-center w-10 h-10 bg-gray-200 rounded-full"}>
                    <View className={"font-extra_bold"}>
                        <FontAwesomeIcon size={14} icon={faChevronLeft}/>
                    </View>
                </TouchableOpacity>
                <Text className="mt-10 font-bold text-4xl">
                    What's your email?
                </Text>
                <Text className="mt-10 font-medium text-2xl text-gray-400">
                    Let's create an account with your email address
                </Text>
                <TextInput
                    className={"mt-10 text-xl font-medium"}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                />
                <View className={"mt-10 w-full flex flex-row justify-center items-center"}>
                    <TouchableOpacity className={"flex flex-row items-center justify-center w-48 h-14 rounded-xl bg-[#FC4C02]"} onPress={() => navigation.push("SignUpPassword")}>
                        <Text className="font-bold text-xl text-white">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default SignUpEmail;