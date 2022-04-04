import { StyleSheet, ScrollView } from 'react-native'
import { View } from "../components/Themed";
import React from 'react'
import pins from '../assets/data/pins';
import Pin from './Pin';

interface IMasonryList {
    pins: {
        id: string,
        image: string;
        title: string;
    }[];
}

const MasonryList = ({ pins }: IMasonryList) => {
  return (
    <ScrollView contentContainerStyle={{ width: "100%" }}>
        <View style={styles.container}>
          {/* 1st column */}
          <View style={styles.column}>
            {/* <Pin pin={pins[0]} />
            <Pin pin={pins[1]} />
            <Pin pin={pins[2]} /> */}

            {pins
              .filter((_, index) => index % 2 === 0)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
              ))}
          </View>

          {/* 2nd column */}
          <View style={styles.column}>
            {/* <Pin pin={pins[3]} />
            <Pin pin={pins[4]} />
            <Pin pin={pins[5]} /> */}

            {pins
              .filter((_, index) => index % 2 === 1)
              .map((pin) => (
                <Pin pin={pin} key={pin.id} />
            ))}
          </View>

        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
    },
    column: {
      flex: 1,
    }
  });

export default MasonryList;