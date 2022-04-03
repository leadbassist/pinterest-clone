import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Pin = (props) => {

    // Destructuring image and title from props:
    const {id, image, title} = props.pin;

    const [ratio, setRatio] = useState(1);

    const navigation = useNavigation();

    useEffect(() => {
        if (image) {
            Image.getSize(image, (width, height) => setRatio(width / height));
        }
    }, [image]);

    const onLike = () => {

    };

    const goToPinPage = () => {
        navigation.navigate("Pin", { id });
    }

    return (
        <Pressable onPress={goToPinPage} style={styles.pin}>
            <View>
                <Image source={{ uri: image }}
                style={[styles.image, {aspectRatio: ratio}]} />
                <Pressable onPress={onLike} style={styles.heartBtn}>
                    <Ionicons name="ios-heart-outline" size={16} color="black" />
                </Pressable>
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            
      </Pressable>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        margin: 5,
        color: "#181818",
      },
      pin: {
        width: "100%",
        padding: 4,
      },
      image: {
        width: '100%',
        borderRadius: 15,
        aspectRatio: 1/1,
    },
    heartBtn: {
        backgroundColor: "#D3CFD4",
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 5,
        borderRadius: 50,
    }
});

export default Pin;