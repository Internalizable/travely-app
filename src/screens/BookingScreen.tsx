import React, {useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faLocationDot, faMagnifyingGlass, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from "@react-navigation/native";
import {collection, doc, getDocs, deleteDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";
import {getAuth} from "firebase/auth";
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import {LinearGradient} from "expo-linear-gradient";

interface BookedTourType {
    countryName: string;
    date: string;
    image: string;
    iso: string;
    location: string;
    name: string;
    id: string;
}

const BookingScreen: React.FC<any> = ({props}) => {

    const [tours, setTours] = useState<BookedTourType[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isDeleting, setDeleting] = useState<string>("");

    const viewRef = useRef<Animatable.View & View>(null);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
            setLoading(true)

            const auth = getAuth();
            const user = auth.currentUser;

            console.log("Mounted")

            if (user) {
                const userId = user.uid;

                getDocs(collection(db, "users/" + userId + "/bookings"))
                    .then(res => {
                        setTours(res.docs.map(doc => doc.data() as BookedTourType).slice().map(tour => {
                            const formattedDate = new Date(tour.date).toLocaleDateString('en-GB'); // Format as dd/mm/yyyy

                            return {
                                ...tour,
                                date: formattedDate
                            };
                        }).sort((a, b) => {
                            const dateA = new Date(a.date).getTime();
                            const dateB = new Date(b.date).getTime();

                            return dateA - dateB;
                        }));

                        setLoading(false)
                    });
            }
        }, [])
    );

    const cancelBooking = async (booking: BookedTourType) => {
        setDeleting(booking.id);

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const bookingRef = doc(db, "users", userId, "bookings", booking.id);

            await deleteDoc(bookingRef);

            setTours(prevTours => prevTours.filter(tour => tour.id !== booking.id));
        }

        setDeleting("");
    }


    const renderItem = ({ item }: { item: BookedTourType }) => (
        <View className="w-full h-[24rem] rounded-2xl shadow-xl px-5 bg-transparent">
            <View className={"w-full h-56 rounded-xl overflow-hidden"}>
                <FastImage style={{overflow: "hidden"}} className={"w-full h-full overflow-hidden"} source={{uri: item.image, priority: FastImage.priority.normal}}
                           resizeMode={FastImage.resizeMode.contain}/>
            </View>
            <View className="px-6 py-4">
                <Text className="font-bold text-xl mb-2">{item.name}</Text>
                <View className={"flex flex-row items-center justify-start"}>
                    <FontAwesomeIcon color={"#FAA935FF"} size={20} icon={faLocationDot}/>
                    <Text className={"text-base pl-2 font-medium"}>{item.location}</Text>
                </View>
            </View>
            <View className="px-6 pt-4 pb-2">
                <View className={"flex flex-row justify-between pb-5"}>
                    <Text className={"text-lg font-bold text-[#FAA935FF]"}>
                        {item.date}
                    </Text>
                    <TouchableOpacity onPress={() => cancelBooking(item)}>
                        <View className={"flex flex-row items-center justify-center w-28 h-10 bg-[#FAA935FF] rounded-lg"}>
                            {isDeleting == item.id ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text className={"text-lg text-white font-regular"}>
                                    Cancel
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const PlaceholderComponent = () => {
        return (
            <>
                {[...Array(6)].map((_, index) => {
                    return (
                        <View key={index} className="max-w-sm rounded-2xl overflow-hidden shadow-xl px-5 my-2">
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
                })}
            </>
        )
    };


    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow bg-white"}>
            <View className="flex-row items-center justify-start bg-white w-full h-28">
                <Text className="ml-7 mt-5 font-extrabold text-4xl">
                    Bookings
                </Text>
            </View>

            <FlatList
                data={tours}
                renderItem={renderItem}
                keyExtractor={(item, index) => `list-item-${index}`}
                ListEmptyComponent={isLoading ? <PlaceholderComponent /> : <></>}
                className={"mt-2 mb-28"}
            />
        </Animatable.View>
    );
};

export default BookingScreen;
