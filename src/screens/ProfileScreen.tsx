import React, {useContext, useRef} from "react";
import {Alert, Image, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faChevronRight, faCircleQuestion,
    faComments,
    faHome, faLock,
    faMagnifyingGlass, faRightFromBracket, faShield, faThumbsUp, faTrash,
    faUser,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from "@react-navigation/native";
import {UserContext} from "../context/UserContext";
import {getAuth} from "firebase/auth";
import {auth} from "../../firebaseConfig";

const ProfileScreen: React.FC<any> = ({props}) => {

    const viewRef = useRef<Animatable.View & View>(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    const userContext = useContext(UserContext);
    const { user, setUser } = userContext;

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
                        <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                   resizeMode={FastImage.resizeMode.contain} style={{ width: 74, height: 74 }}/>
                        <View className={"flex flex-col w-[56%]"}>
                            <Text className={"font-medium text-base"}>
                                Elie Sfeir
                            </Text>
                            <Text className={"font-medium text-base text-gray-500"}>
                                {user?.email}
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-5 flex flex-col items-start justify-between w-full ml-7">
                    <Text className="font-semi_bold text-2xl">
                        Settings
                    </Text>

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
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
                    </View>

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
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
                    </View>

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
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
                    </View>

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
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
                    </View>

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center"}>
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
                    </View>

                    <TouchableOpacity className={"mt-5 flex flex-row w-10/12 justify-between items-center"} onPress={() => auth.signOut()}>
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

                    <View className={"mt-5 flex flex-row w-10/12 justify-between items-center mb-20"}>
                        <View className={"flex flex-row justify-center items-center w-11 h-11 bg-red-600 rounded-full"}>
                            <FontAwesomeIcon color={"white"} size={20} icon={faTrash}/>
                        </View>
                        <View className={"flex flex-row w-[67%]"}>
                            <Text className={"font-medium text-xl"}>
                                Delete account
                            </Text>
                        </View>
                        <View className={"flex flex-row justify-center items-center w-6 h-6 bg-gray-200 rounded-full"}>
                            <View className={"font-extra_bold"}>
                                <FontAwesomeIcon size={12} icon={faChevronRight}/>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default ProfileScreen;
