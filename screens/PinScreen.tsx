import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import pins from "../assets/data/pins";
import Navigation from '../navigation';
import { useNavigation, useRoute } from '@react-navigation/native';

const PinScreen = () => {
    const [ratio, setRatio] = useState(1);

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const route = useRoute();

    const pinId = route.params?.id;

    const pin = pins.find(p => p.id === pinId);

    useEffect(() => {
        if (pin?.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height));
        }
    }, [pin]);

    const goBack = () => {
        navigation.goBack();
    };

    if (!pin) {
        return <Text>Pin not found</Text>;
    }

    return (
        <SafeAreaView style={{ backgroundColor: "black"}}>
            {/* StatusBar text needs to be in white */}
            <StatusBar style="light" />
            <View style={styles.root}>
                <Image source={{ uri: pin.image }} style={[styles.image, {aspectRatio: ratio}]} />
                <Text style={styles.title}>{pin.title}</Text>

            </View>
            <Pressable onPress={goBack} style={[styles.backBtn, { top: insets.top + 20 }]}>
                <Ionicons name="chevron-back-sharp" size={35} color="white" />
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    image: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        margin: 10,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 30,
    },
    backBtn: {
        position: "absolute",
        left: 10,

    }
})

export default PinScreen;