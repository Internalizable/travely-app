import React, {useRef} from "react";
import {Alert, Image, ImageBackground, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faMagnifyingGlass, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import {SvgUri} from "react-native-svg";
import FastImage from "react-native-fast-image";
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from "@react-navigation/native";

const WalletScreen: React.FC<any> = ({props}) => {

    const viewRef = useRef<Animatable.View & View>(null);

    useFocusEffect(
        React.useCallback(() => {
            viewRef!.current!.fadeIn!(500);
        }, [])
    );

    return (
        <Animatable.View ref={viewRef} animation="fadeIn" className={"flex flex-grow"}>
            <ScrollView className={"h-screen flex flex-grow"} stickyHeaderIndices={[0]}>
                <View className="flex-row items-center justify-start bg-white w-full h-28">
                    <Text className="ml-7 mt-5 font-extrabold text-4xl">
                        Wallet
                    </Text>
                </View>
            </ScrollView>
        </Animatable.View>
    );
};

export default WalletScreen;