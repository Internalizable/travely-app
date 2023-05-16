import React, {useContext, useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground, Linking,
    Modal, Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faChevronRight, faCircleQuestion,
    faComments,
    faHome, faLock,
    faMagnifyingGlass, faRightFromBracket, faShield, faThumbsUp, faTrash,
    faUser,
    faWallet, faX
} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from "@react-navigation/native";
import {UserContext} from "../context/UserContext";
import {getAuth} from "firebase/auth";
import {auth, storage, db} from "../../firebaseConfig";
import Accordion from "../components/Accordion";
import {Calendar} from "react-native-calendars";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';
import {Picker} from "@react-native-picker/picker";
import {addDoc, collection, doc, getDocs, setDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {Country} from "./home/HomeScreen";

const { v4: uuidv4 } = require('uuid');


const ProfileScreen: React.FC<any> = ({props}) => {

    const viewRef = useRef<Animatable.View & View>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const userContext = useContext(UserContext);
    const { user, claims } = userContext;

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    useEffect(() => {
        if(claims?.admin) {
            requestGalleryPermission();
            getDocs(collection(db, "countries"))
                .then(res => {
                    setAllCountries(res.docs.map(doc => doc.data() as Country))
                });
        }
    }, []);

    const [tourName, setTourName] = useState<string>('');
    const [tourLocation, setTourLocation] = useState<string>('');
    const [tourPrice, setTourPrice] = useState<string>('');
    const [tourCountry, setTourCountry] = useState<string>();
    const [tourImage, setTourImage] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    const requestGalleryPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled && result.assets[0]) {
            setTourImage(result.assets[0]!.uri!);
        }
    };

    const closeModal = async () => {
        setTourName("")
        setTourImage(null)
        setTourPrice("")
        setTourLocation("")
        setTourCountry("")

        setModalVisible(false)
    }

    const saveTour = async () => {
        if(tourImage == null || tourImage == "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An image must be provided'
            });
        } else if(tourName == "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'A name must be provided'
            });
        } else if(tourLocation == "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'A tour location must be provided'
            });
        } else if(tourPrice == "") {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'A tour price must be provided'
            });
        } else {

            setSaving(true)

            const uploadUri = Platform.OS === 'ios' ? tourImage.replace('file://', '') : tourImage;
            const fileExtension = uploadUri.split('.').pop();

            const storageRef = ref(storage, `images/${uuidv4()}.${fileExtension}`);

            fetch(uploadUri)
                .then(response => response.blob())
                .then(blob => {
                    uploadBytes(storageRef, blob).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                            addDoc(collection(db, `countries/${tourCountry}/tours`), {
                                name: tourName,
                                location: tourLocation,
                                image: downloadURL,
                                price: Number(tourPrice)
                            }).then((res) => {
                                closeModal()
                                setSaving(false);
                            })
                        }).catch((error) => {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'An error occurred whilst uploading'
                            });
                        }).finally(() => {
                            setSaving(false);
                        });
                    });
            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'An error occurred whilst uploading'
                });
                setSaving(false);
            });

        }

    }


    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow"}>
            <ScrollView className={"h-screen flex flex-grow bg-white"} stickyHeaderIndices={[0]}>
                <View className="flex-row items-center justify-start bg-white w-full h-32">
                    <Text className="ml-7 mt-5 font-extrabold text-4xl">
                        Profile
                    </Text>
                </View>
                <View className="flex flex-col items-start justify-between w-full h-32 ml-7">
                    <Text className="font-semi_bold text-2xl">
                        Account
                    </Text>

                    <View className={"flex flex-row w-10/12 justify-between items-center"}>
                        <FastImage source={{uri: "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", priority: FastImage.priority.normal}}
                                       resizeMode={FastImage.resizeMode.contain} style={{ width: 74, height: 74, borderRadius: 100 }}/>
                        <View className={"flex flex-col w-[56%]"}>
                            <Text className={"font-medium text-base"}>
                                Elie Sfeir
                            </Text>
                            <Text className={"font-medium text-base text-gray-500"}>
                                {user?.email}
                            </Text>
                        </View>
                        <View className={"w-6"}>
                        </View>
                    </View>
                </View>
                <View className="mt-5 flex flex-col items-start justify-between w-full ml-7">
                    <Text className="font-semi_bold text-2xl">
                        Settings
                    </Text>

                    {claims?.admin &&
                        <Accordion title={"Admin Section"}>
                            <View>
                                <TouchableOpacity onPress={() => setModalVisible(true)} className={"mt-5 ml-[6%] flex flex-row w-10/12 justify-between items-center"}>
                                    <View className={"flex flex-row justify-center items-center w-8 h-8 bg-green-600 rounded-full"}>
                                        <FontAwesomeIcon color={"white"} size={14} icon={faComments}/>
                                    </View>
                                    <View className={"flex flex-row w-[73%]"}>
                                        <Text className={"font-medium text-lg"}>
                                            Create a tour
                                        </Text>
                                    </View>
                                    <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                                        <View className={"font-extra_bold"}>
                                            <FontAwesomeIcon size={12} icon={faChevronRight}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Accordion>
                    }


                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')} className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-sky-600 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faComments}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Live chat
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')} className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-rose-500 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faThumbsUp}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Share app
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')} className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-orange-400 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faCircleQuestion}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Help
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')} className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-purple-600 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faLock}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Privacy
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com/')} className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-green-500 rounded-full "}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faShield}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Terms
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className={"mt-5 flex flex-row w-10/12 justify-between items-center mb-20"} onPress={() => auth.signOut()}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-red-400 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faRightFromBracket}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Sign out
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setModalVisible(!isModalVisible);
                    }}>
                    <View className={"flex flex-col w-full h-full justify-center"}>

                        <View className={"flex flex-col w-full justify-center bg-white rounded-t-3xl shadow-xl"}>
                            <View className={"flex flex-row items-center justify-end bg-white pr-5 pt-5"}>
                                <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} className={"flex flex-row justify-center items-center w-10 h-10 bg-gray-200 rounded-full"}>
                                    <View className={"font-extra_bold"}>
                                        <FontAwesomeIcon size={14} icon={faX}/>
                                    </View>

                                </TouchableOpacity>
                            </View>

                            <View className={"flex flex-col w-full justify-center items-center"}>
                                <TouchableOpacity onPress={pickImage}>
                                    {tourImage ?
                                        <Image source={{ uri: tourImage }} className={"w-60 h-60 rounded-3xl"} /> :
                                        <View className={"w-60 h-60 rounded-3xl bg-[#E5E7EB]"}></View>}
                                </TouchableOpacity>
                            </View>

                            <View className={"flex flex-col w-full ml-8 mt-8 justify-between"}>
                                <Text className={"text-xl text-bold mb-1"}>
                                    Tour Name
                                </Text>
                                <TextInput className={"bg-[#E5E7EB] rounded-3xl w-60 h-8 pl-4"} placeholder="Tour Name" value={tourName} onChangeText={setTourName} />

                                <Text className={"text-xl text-bold mt-6 mb-1"}>
                                    Tour Location
                                </Text>
                                <TextInput className={"bg-[#E5E7EB] rounded-3xl w-60 h-8 pl-4"} placeholder="Tour Location" value={tourLocation} onChangeText={setTourLocation} />

                                <Text className={"text-xl text-bold mt-6 mb-1"}>
                                    Tour Price
                                </Text>
                                <TextInput keyboardType={"numeric"} className={"bg-[#E5E7EB] rounded-3xl w-60 h-8 pl-4"} placeholder="Tour Price" value={tourPrice} onChangeText={setTourPrice} />

                                <View className={"flex flex-row mt-4 items-center justify-start"}>
                                    <Text className={"text-xl text-bold"}>
                                        Tour Country
                                    </Text>
                                    <Picker
                                        selectedValue={tourCountry}
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => setTourCountry(itemValue)}
                                    >
                                        {
                                            allCountries.map(country => (
                                                <Picker.Item key={country.code} label={country.name} value={country.code} />
                                            ))
                                        }
                                    </Picker>
                                </View>
                            </View>


                            <View className={"flex flex-row items-center justify-end bg-white pr-5 pt-5 pb-5 rounded-b-3xl"}>
                                <TouchableOpacity disabled={saving} onPress={() => {
                                    saveTour()
                                }}>
                                    <View className={"flex flex-row items-center justify-center w-28 h-10 bg-[#FAA935FF] rounded-xl"}>
                                        {saving ? (
                                            <ActivityIndicator size="small" color="#FFFFFF" />
                                        ) : (
                                            <Text className={"text-lg text-white font-regular"}>
                                                Create
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </ScrollView>
        </Animatable.View>
    );
};

export default ProfileScreen;
