import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import pins from '../assets/data/pins';

import EditScreenInfo from '../components/EditScreenInfo';
import MasonryList from '../components/MasonryList';
import { Text, View } from '../components/Themed';

import { Entypo } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Entypo name="share" size={24} color="black" style={styles.icon} />
          <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.icon} />
        </View>
        <Image source={{ uri: "https://media-exp1.licdn.com/dms/image/C5603AQGpSZVctIiSRw/profile-displayphoto-shrink_200_200/0/1584135505719?e=1654732800&v=beta&t=nM7lZEfdwF4pMA6EJ48SQ6j8wRbe2DdFk-URE3gNhX4"}}
        style={styles.image}
        />
        <Text style={styles.title}>Davy Mustaine</Text>
        <Text style={styles.subtitle}>128 Followers | 498 Followings</Text>
      </View>
        <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
    flexDirection: 'row',
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  }
});
