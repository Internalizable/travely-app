import React, {useEffect, useRef, useState} from "react";
import * as Animatable from "react-native-animatable";
import {
    Button, Dimensions,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View
} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faLocationDot, faMagnifyingGlass, faX} from "@fortawesome/free-solid-svg-icons";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import tw from "twrnc";
import {collection, getDocs, query, where, addDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../../../firebaseConfig";
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import {LinearGradient} from "expo-linear-gradient";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import ConfettiCannon from "react-native-confetti-cannon";
import {getAuth} from "firebase/auth";

function generateRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const TourConfirmationScreen: React.FC<any> = ({navigation, route, tabNavigation}) => {

    const viewRef = useRef<Animatable.View & View>(null);

    const iso = route.params.iso;
    const countryName = route.params.countryName;
    const name = route.params.name;
    const date = route.params.date;
    const image = route.params.image;
    const location = route.params.location;

    const xDimension = Dimensions.get("screen").width;

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const tourId = generateRandomString(10);

            const bookingsRef = doc(db, `users`, userId, `bookings`, tourId);

            setDoc(bookingsRef, {
                id: tourId,
                iso: iso,
                countryName: countryName,
                name: name,
                date: date,
                image: image,
                location: location
            }).then((res) => {
                console.log("Booking saved with ID: ", tourId);

                setTimeout(() => {
                    navigation.popToTop();
                    tabNavigation.navigate("Bookings")
                }, 4000);
            })
        } else {
            console.log("No user is signed in.");
        }
    }, [])

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow bg-white"}>
            <ScrollView className={"h-screen flex flex-grow bg-white"}>
                <ConfettiCannon
                    count={35}
                    origin={{x: 0, y: 0}}
                    autoStart={true}
                    autoStartDelay={3}
                    explosionSpeed={1000}
                    fallSpeed={3000}
                />
                <ConfettiCannon
                    count={35}
                    origin={{x: xDimension, y: 0}}
                    autoStart={true}
                    autoStartDelay={3}
                    explosionSpeed={1000}
                    fallSpeed={3000}
                />
                <View className={"h-screen w-full flex flex-col justify-center items-center"}>
                    <Image
                        source={require('../../../../assets/images/airplane.png')}
                        style={tw`w-20 h-20`}
                    />
                    <Text className={"text-lg text-black font-light pt-5"}>
                        We are confirming your booking...
                    </Text>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default TourConfirmationScreen;
