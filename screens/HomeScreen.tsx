import { StyleSheet, Image, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Pin from "../components/Pin";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
      <ScrollView>
        <View style={styles.container}>
          <Pin
            pin={{
              title: "Title",
              image:
              "https://images.unsplash.com/photo-1648723703826-5cdfdd3fb7cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <Pin 
            pin={{
              title: "Title",
              image:
              "https://images.unsplash.com/photo-1648749052442-49c49c2a32b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            }}
          />
          <Pin 
            pin={{
              title: "Title",
              image:
              "https://images.unsplash.com/photo-1648780693971-672bbb3198ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
