import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type DetailsScreenNavigationProp = StackNavigationProp<any, any>;
type DetailsScreenRouteProp = RouteProp<any, any>;

const DetailsScreen = ({ navigation, route }: { navigation: DetailsScreenNavigationProp; route: DetailsScreenRouteProp }) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>{route.params?.message}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsScreen;
