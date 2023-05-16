import React, {useContext, useEffect, useRef, useState} from "react";
import * as Animatable from "react-native-animatable";
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
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
import {collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../../firebaseConfig";
import {createShimmerPlaceholder} from "react-native-shimmer-placeholder";
import {LinearGradient} from "expo-linear-gradient";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {OnboardingContext} from "../../onboarding/context/OnboardingContext";
import {UserContext} from "../../../context/UserContext";

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
    const [selectedTourType, setSelectedTourType] = useState<TourType | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>();
    const [deleting, setDeleting] = useState<string>("");

    const iso = route.params.iso;
    const name = route.params.name;

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const today = new Date().toISOString().split('T')[0];

    const markedDates = selectedDate ? {
        [selectedDate]: {
            selected: true,
            selectedColor: 'blue',
        },
    } : {};

    const userContext = useContext(UserContext);
    const { claims } = userContext;


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

    const createTwoButtonAlert = (tour: TourType) =>
        Alert.alert('Delete ' + tour.name + '?', 'Do you really want to delete the following tour?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Delete', onPress: async () => {
                setDeleting(tour.name);

                const tourQuery = query(collection(db, `countries/${iso}/tours`),
                    where("name", "==", tour.name));

                getDocs(tourQuery)
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            deleteDoc(doc.ref)
                                .then(() => {
                                    console.log("Tour successfully deleted!");

                                    setTours(tours.filter(t => t.name != tour.name))
                                    setDeleting("");
                                })
                                .catch((error) => {
                                    console.error("Error removing tour: ", error);
                                    setDeleting("");
                                });
                        });
                    })
                    .catch((error) => {
                        console.error("Error getting documents: ", error);
                        setDeleting("");
                    });
            }},
        ]);

    const renderItem = ({ item }: { item: TourType }) => (
        <View className="w-full h-[26rem] rounded-2xl shadow-xl px-5 bg-transparent">
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
                        {item.price}$/person
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                        setSelectedTourType(item)
                    }}>
                        <View className={"flex flex-row items-center justify-center w-28 h-10 bg-[#FAA935FF] rounded-lg"}>
                            <Text className={"text-lg text-white font-regular"}>
                                Book Now
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {claims?.admin &&
                <View className="px-6 pb-6">
                    <TouchableOpacity onPress={() => createTwoButtonAlert(item)} className={"flex flex-row h-12 bg-red-500 rounded-xl justify-center items-center"}>
                        {deleting == item.name ?  <ActivityIndicator size="small" color="#FFFFFF" /> :
                            <Text className={"text-lg text-white font-semibold"}>Delete Tour</Text>
                        }
                    </TouchableOpacity>
                </View>
            }

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
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}>
                <View className={"flex flex-col w-full h-full justify-center"}>

                    <View className={"flex flex-col w-full h-64 justify-center bg-white rounded-t-3xl shadow-xl"}>
                        <View className={"flex flex-row items-center justify-end bg-white pr-5 pt-5"}>
                            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} className={"flex flex-row justify-center items-center w-10 h-10 bg-gray-200 rounded-full"}>
                                <View className={"font-extra_bold"}>
                                    <FontAwesomeIcon size={14} icon={faX}/>
                                </View>

                            </TouchableOpacity>
                        </View>

                        <Calendar minDate={today}
                                  onDayPress={day => {
                                      setSelectedDate(day.dateString);
                                  }}
                                  markedDates={markedDates}/>
                        <View className={"flex flex-row items-center justify-end bg-white pr-5 pt-5 pb-5 rounded-b-3xl"}>
                            <TouchableOpacity onPress={() => {

                                if(!selectedDate) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: "You need to have a date selected."
                                    });

                                    return;
                                }

                                setModalVisible(false)

                                navigation.push("TourConfirmation", {
                                    iso: iso,
                                    countryName: name,
                                    name: selectedTourType!.name,
                                    date: selectedDate,
                                    image: selectedTourType!.image,
                                    location: selectedTourType!.location,
                                })
                            }}>
                                <View className={"flex flex-row items-center justify-center w-28 h-10 bg-[#FAA935FF] rounded-xl"}>
                                    <Text className={"text-lg text-white font-regular"}>
                                        Continue
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

            <FlatList
                data={tours}
                renderItem={renderItem}
                keyExtractor={(item, index) => `list-item-${index}`}
                ListEmptyComponent={isLoading ? <PlaceholderComponent/> : <></>}
                className={"mt-2 mb-20"}
            />
        </Animatable.View>

    );
};

export default TourScreen;
