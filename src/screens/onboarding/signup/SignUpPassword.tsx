import React, {useContext, useRef, useState} from "react";
import {
    ActivityIndicator,
    Alert, Dimensions,
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
import ConfettiCannon from "react-native-confetti-cannon";
import {UserContext} from "../../../context/UserContext";
import {OnboardingContext} from "../context/OnboardingContext";
import Toast from "react-native-toast-message";
import firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../../firebaseConfig";
import {setDoc, collection, doc} from "firebase/firestore";

const SignUpPassword: React.FC<any> = ({navigation}) => {

    const [password, onChangePassword] = React.useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const onboardingContext = useContext(OnboardingContext);
    const userContext = useContext(UserContext);

    if (!onboardingContext)
        throw new Error('SignUpEmail must be rendered within an OnboardingContext.Provider');

    const { onboardedUser, setOnboardedUser } = onboardingContext;
    const { user, setUser, setClaims } = userContext;

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
                    Choose a password
                </Text>
                <TextInput
                    className={"mt-10 text-xl font-medium"}
                    onChangeText={(text) => setOnboardedUser({
                        ...onboardedUser,
                        password: text
                    })}
                    value={onboardedUser.password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View className={"mt-10 w-full flex flex-row justify-center items-center"}>
                    <TouchableOpacity disabled={loading} className={"flex flex-row items-center justify-center w-48 h-14 rounded-xl bg-[#FC4C02]"} onPress={async () => {
                        if (onboardedUser.password.length < 5) {
                            Toast.show({
                                type: 'error',
                                text1: 'Invalid password',
                                text2: 'Your password should be at least 5 characters long!'
                            });
                            return;
                        }

                        setLoading(true)

                        await createUserWithEmailAndPassword(auth, onboardedUser.email, onboardedUser.password)
                            .then(async (userCredential) => {
                                const user = userCredential.user;

                                const userRef = doc(db, `users`, user.uid);

                                await setDoc(userRef, {
                                    id: user.uid,
                                    firstName: onboardedUser.firstName,
                                    lastName: onboardedUser.lastName,
                                    country: onboardedUser.country,
                                    email: onboardedUser.email,
                                    admin: false,
                                }).then((res) => {
                                    setUser(user)
                                    setClaims({
                                        admin: false
                                    })
                                })
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;

                                console.log(errorMessage)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error ' + errorCode,
                                    text2: errorMessage
                                });
                            }).finally(() => setLoading(false));
                    }}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text className="font-bold text-xl text-white">Next</Text>
                        )}
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </Animatable.View>
    );
};

export default SignUpPassword;
