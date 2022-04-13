import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import pins from "../assets/data/pins";

import EditScreenInfo from "../components/EditScreenInfo";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";

import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import {
  NhostReactProvider,
  useNhostClient,
  useSignOut,
  useUserId,
} from "@nhost/react";

const GET_USER_QUERY = `
query MyQuery ($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}
`;

export default function ProfileScreen() {
  const [user, setUser] = useState();

  const { signOut } = useSignOut();
  const nhost = useNhostClient();

  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    console.log(result);
    if (result.error) {
      Alert.alert("Error fetching the user");
    } else {
      setUser(result.data.user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // show loading icon when user is loading data
  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Octicons
              name="sign-out"
              size={24}
              color="black"
              style={styles.icon}
            />
          </Pressable>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>128 Followers | 498 Followings</Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  subtitle: {
    fontWeight: "600",
    color: "#181818",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
