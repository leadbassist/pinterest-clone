import { ActivityIndicator, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";

const RemoteImage = ({ fileId }) => {
  const [ratio, setRatio] = useState(1);
  const [imageUri, setImageUri] = useState("");

  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({
      fileId: fileId,
    });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
    // console.log(result);
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => setRatio(width / height));
    }
  }, [imageUri]);

  if (!imageUri) {
    return <ActivityIndicator />;
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.image, { aspectRatio: ratio }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 15,
    aspectRatio: 1 / 1,
  },
});

export default RemoteImage;
