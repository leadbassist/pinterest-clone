import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNhostClient } from '@nhost/react';
import { useNavigation } from '@react-navigation/native';

const CREATE_PIN_MUTATION = `
mutation MyMutation ($image: String!, $title: String) {
  insert_auth_pins(objects: {image: $image, title: $title }) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}
`;

export default function CreatePinScreen() {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");

  const nhost = useNhostClient();
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadFile = async () => {
    // because we added type 'null' on imageUri STATE, we need to accomodate that scenario:
    if (!imageUri) {
      return {
        error: {
          message: "No image selected",
        }
      };
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri = Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

    const result = await nhost.storage.upload({
      file: {
        name: name,
        type: `image/${extension}`,
        uri: uri,
      }
    });
    return result;
  };

  const onSubmit = async () => {
    // upload image to storage
    const uploadResult = await uploadFile();

    if (uploadResult.error) {
      Alert.alert("Error uploading the image", uploadResult.error.message);
      return;
    }


    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title: title,
      image: uploadResult.fileMetadata.id,
    });
    if (result.error) {
      Alert.alert("Error creating the post", result.error.message);
    } else {
      navigation.goBack()
    }
    // console.log(result);
  };

  return (
    <View style={styles.root}>
      <Button title="Upload your pin" onPress={pickImage} />
      <>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TextInput placeholder="Title.." value={title} onChangeText={setTitle} style={styles.input} />
        <Button title="Submit pin" onPress={onSubmit} />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "gainsboro",
        padding: 5,
        width: "100%",
    },
    image: {
      width: "100%",
      aspectRatio: 1,
      marginVertical: 10,
      borderRadius: 5,
    },
});
