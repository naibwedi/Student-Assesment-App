import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.content}>
        Welcome to the Student Assessment Dashboard! This app is designed to help teachers efficiently manage student data, track course details, and monitor assessment results in one easy-to-use platform.
      </Text>
      <Text style={styles.content}>
        Built with React Native, Expo, and Firebase, our application offers real-time updates and insightful analytics, including grade distribution charts to help you make data-driven decisions. Whether you're adding new students, editing course information, or reviewing assessment performance, our goal is to streamline your workflow and enhance the educational experience.
      </Text>
      <Text style={styles.content}>
        We are committed to continuously improving the app based on your feedback. Thank you for choosing the Student Assessment Dashboard!
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
  },
});

export default DetailsScreen;
