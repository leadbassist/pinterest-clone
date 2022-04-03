import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 


const Pin = (props) => {

    // Destructuring image and title from props:
    const {image, title} = props.pin;

    const [ratio, setRatio] = useState(1/2);

    const onLike = () => {

    };

    useEffect(() => {
        if (image) {
            Image.getSize(image, (width, height) => setRatio(width / height));
        }
    }, [image]);

    return (
        <View style={styles.pin}>
            <View>
                <Image source={{ uri: image }}
                style={[styles.image, {aspectRatio: ratio}]} />
                <Pressable onPress={onLike} style={styles.heartBtn}>
                    <Ionicons name="ios-heart-outline" size={16} color="black" />
                </Pressable>
            </View>
            <Text style={styles.title}>{title}</Text>
            
      </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
      },
      pin: {
        width: "100%",
      },
      image: {
        width: '100%',
        borderRadius: 25,
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