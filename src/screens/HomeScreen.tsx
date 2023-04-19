import React, {useRef} from "react";
import {Alert, Animated, Image, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faMagnifyingGlass, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {ActiveScreen} from "../utils/ActiveScreen";
import * as Animatable from 'react-native-animatable';

const HomeScreen: React.FC<any> = ({props}) => {
    const viewRef = useRef<Animatable.View & View>(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow"}>
            <ScrollView className={"h-screen flex flex-grow bg-white"} stickyHeaderIndices={[0]}>
                <View className="flex-row items-center justify-start bg-white w-full h-28">
                    <Text className="ml-7 mt-5 font-extrabold text-4xl">
                        Explore
                    </Text>
                </View>

                <View className={"mt-5 ml-7 flex flex-row w-10/12 h-14 bg-[#f9f7f7] rounded-3xl items-center justify-between"}>
                    <View className={"w-1/5"}>
                        <FontAwesomeIcon size={20} style={tw`ml-5`} icon={faMagnifyingGlass}/>
                    </View>
                    <View className={"w-4/5"}>
                        <Text className={"text-base font-bold"}>
                            Search for your destination
                        </Text>
                    </View>
                </View>

                <View className={"ml-7 mt-5 w-10/12 h-48 rounded-xl bg-[#C1E4D7] flex flex-row flex-shrink-0 items-center justify-center"}>
                    <View className={"flex flex-row w-10/12 h-full items-center justify-between"}>
                        <View className={"flex flex-col w-[60%] h-full items-start justify-between"}>
                            <View className={"flex flex-col h-[55%] items-start justify-end"}>
                                <Text className={"text-2xl font-semi_bold"}>Redeem your</Text>
                                <Text className={"text-2xl font-semi_bold"}>15% discount</Text>
                            </View>

                            <View className={"flex flex-col h-[45%] items-start justify-center"}>
                                <Text className={"text-sm font-semi_bold text-gray-400"}>Promo code:</Text>
                                <Text className={"text-sm font-semi_bold text-gray-400"}>welcome</Text>
                            </View>
                        </View>
                        <Image
                            source={require('../../assets/images/green_cash_bag.png')}
                            style={tw`w-[30%] h-[70%]`}
                        />
                    </View>
                </View>
                <View className={"mt-7 w-full h-64 flex flex-col items-start justify-between"}>
                    <Text className="ml-7 font-bold text-2xl">
                        Popular Destinations
                    </Text>

                    <ScrollView className={"w-[93%] flex flex-row gap-2 overflow-visible mt-2"} horizontal={true} showsHorizontalScrollIndicator={false} onMoveShouldSetResponderCapture={() => {
                        return true;
                    }}>
                        <View className={"w-5"}></View>

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <ImageBackground source={require('../../assets/images/uae.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>Saudi Arabia</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 2")}>
                            <ImageBackground source={require('../../assets/images/france.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>France</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 3")}>
                            <ImageBackground source={require('../../assets/images/uk.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>United Kingdom</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 4")}>
                            <ImageBackground source={require('../../assets/images/italy.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>Italy</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 5")}>
                            <ImageBackground source={require('../../assets/images/usa.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>United States of America</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 5")}>
                            <ImageBackground source={require('../../assets/images/australia.jpg')} imageStyle={tw`rounded-3xl`} className={"w-44 h-44"}>
                                <View style={{position: 'absolute', top: 20, left: 20, right: 0, bottom: 0}}>
                                    <Text className={"font-semi_bold text-white"}>Australia</Text>
                                </View>
                            </ImageBackground>
                        </Pressable >
                    </ScrollView>
                </View>

                <View className={"mt-4 w-full h-40 flex flex-col items-start justify-between"}>
                    <Text className="ml-7 font-bold text-xl">
                        Europe
                    </Text>

                    <ScrollView className={"w-[93%] flex flex-row gap-2 overflow-visible mt-2"} horizontal={true} showsHorizontalScrollIndicator={false} onMoveShouldSetResponderCapture={() => {
                        return true;
                    }}>
                        <View className={"w-5"}></View>

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                    </ScrollView>
                </View>

                <View className={"mt-4 w-full h-40 flex flex-col items-start justify-between"}>
                    <Text className="ml-7 font-bold text-xl">
                        Asia
                    </Text>

                    <ScrollView className={"w-[93%] flex flex-row gap-2 overflow-visible mt-2"} horizontal={true} showsHorizontalScrollIndicator={false} onMoveShouldSetResponderCapture={() => {
                        return true;
                    }}>
                        <View className={"w-5"}></View>

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                    </ScrollView>
                </View>

                <View className={"mt-4 w-full h-40 flex flex-col items-start justify-between"}>
                    <Text className="ml-7 font-bold text-xl">
                        Africa
                    </Text>

                    <ScrollView className={"w-[93%] flex flex-row gap-2 overflow-visible mt-2"} horizontal={true} showsHorizontalScrollIndicator={false} onMoveShouldSetResponderCapture={() => {
                        return true;
                    }}>
                        <View className={"w-5"}></View>

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                    </ScrollView>
                </View>

                <View className={"my-4 w-full h-40 flex flex-col items-start justify-between mb-20"}>
                    <Text className="ml-7 font-bold text-xl">
                        America
                    </Text>

                    <ScrollView className={"w-[93%] flex flex-row gap-2 overflow-visible mt-2"} horizontal={true} showsHorizontalScrollIndicator={false} onMoveShouldSetResponderCapture={() => {
                        return true;
                    }}>
                        <View className={"w-5"}></View>

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >

                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable >
                        <Pressable onPress={() => Alert.alert("PRESSED 1")}>
                            <View className={"w-28 h-28 rounded-2xl bg-[#f9f7f7] flex flex-col justify-center items-center"}>
                                <FastImage source={{uri: "https://firebasestorage.googleapis.com/v0/b/simly-dedfe.appspot.com/o/countries%2FESP.png?alt=media&token=59cdd766-c6d6-4787-a22a-55a62d571c2b", priority: FastImage.priority.normal}}
                                           resizeMode={FastImage.resizeMode.contain} style={{ width: 48, height: 48 }}/>
                                <Text className={"font-semi_bold text-black pt-1"}>Spain</Text>
                            </View>
                        </Pressable>
                    </ScrollView>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default HomeScreen;