import React, {useEffect, useRef, useState} from "react";
import * as Animatable from "react-native-animatable";
import {Button, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, Vibration, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faLocationDot, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import tw from "twrnc";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../../firebaseConfig";
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import {LinearGradient} from "expo-linear-gradient";

interface TourType {
    name: string;
    location: string;
    price: number;
    image: string;
}

const TourScreen: React.FC<any> = ({navigation, route}) => {

    const viewRef = useRef<Animatable.View & View>(null);

    const [tours, setTours] = useState<TourType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const iso = route.params.iso;
    const name = route.params.name;

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    useEffect(() => {
        getDocs(collection(db, "countries/" + iso + "/tours"))
            .then(res => {
                setTours(res.docs.map(doc => doc.data() as TourType))
                setLoading(false)
            });
    }, [])

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow bg-white"}>
            <ScrollView className={"h-screen flex flex-grow bg-white"} stickyHeaderIndices={[0]}>

                <View className={"flex flex-row items-center justify-start bg-white py-5 px-5"}>
                    <TouchableOpacity onPress={() => navigation.goBack()} className={"flex flex-row justify-center items-center w-10 h-10 bg-gray-200 rounded-full"}>
                        <View className={"font-extra_bold"}>
                            <FontAwesomeIcon size={14} icon={faChevronLeft}/>
                        </View>

                    </TouchableOpacity>
                    <Text className="ml-4 font-medium text-3xl">
                        {name}
                    </Text>
                </View>

                {
                    isLoading ? [...Array(6)].map((item, index) => {
                            return (
                                <View key={index} className="max-w-sm rounded-2xl overflow-hidden shadow-xl px-5">
                                    <View className={"w-full h-56 rounded-xl overflow-hidden"}>
                                        <ShimmerPlaceholder visible={!isLoading} shimmerStyle={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: '#E5E7EB'
                                        }}/>
                                    </View>
                                    <View className="px-6 py-4">
                                        <ShimmerPlaceholder visible={!isLoading} shimmerStyle={{
                                            width: 80,
                                            height: 20,
                                            borderRadius: 15,
                                            backgroundColor: '#E5E7EB'
                                        }}/>
                                        <ShimmerPlaceholder visible={!isLoading} shimmerStyle={{
                                            width: 120,
                                            height: 20,
                                            borderRadius: 15,
                                            backgroundColor: '#E5E7EB',
                                            marginTop: 20
                                        }}/>
                                    </View>
                                    <View className="flex flex-row justify-end px-6 pb-2">
                                        <ShimmerPlaceholder visible={!isLoading} shimmerStyle={{
                                            width: 100,
                                            height: 40,
                                            borderRadius: 15,
                                            backgroundColor: '#E5E7EB',
                                            marginBottom: 20
                                        }}/>
                                    </View>
                                </View>
                            )
                        }): tours.map((e: TourType, index: number) =>
                                <View key={index} className="max-w-sm rounded-2xl overflow-hidden shadow-xl px-5">
                                    <View className={"w-full h-56 rounded-xl overflow-hidden"}>
                                        <FastImage className={"w-full h-full"} source={{uri: e.image, priority: FastImage.priority.normal}}
                                                   resizeMode={FastImage.resizeMode.contain}/>
                                    </View>
                                    <View className="px-6 py-4">
                                        <Text className="font-bold text-xl mb-2">{e.name}</Text>
                                        <View className={"flex flex-row items-center justify-start"}>
                                            <FontAwesomeIcon color={"#FAA935FF"} size={20} icon={faLocationDot}/>
                                            <Text className={"text-base pl-2 font-medium"}>{e.location}</Text>
                                        </View>
                                    </View>
                                    <View className="px-6 pt-4 pb-2">
                                        <View className={"flex flex-row justify-between pb-5"}>
                                            <Text className={"text-lg font-bold text-[#FAA935FF]"}>
                                                {e.price}$/person
                                            </Text>
                                            <TouchableOpacity>
                                                <View className={"flex flex-row items-center justify-center w-28 h-10 bg-[#FAA935FF] rounded-lg"}>
                                                    <Text className={"text-lg text-white font-regular"}>
                                                        Book Now
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                        )
                }
                <View className={"w-16 h-20"}>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default TourScreen;
