import react from 'react';
import {Text, View,Button,StyleSheet} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
          
            title="Go to List Student"
            onPress={() => navigation.navigate('ListStudent')}

        />
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,

  },
  Button: {
    margin: 10,
  },
});