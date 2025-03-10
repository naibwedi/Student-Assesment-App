import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; // Make sure these imports are correct


export default function AddStudentScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const addStudent = async () => {
    if (!name || !age) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try {
      await addDoc(collection(db, "students"), {
        name: name,
        age: parseInt(age, 10) // Convert age to a number
      });
      Alert.alert('Success', 'Student added successfully');
      setName('');
      setAge('');
      navigation.goBack(); // Optionally go back to the previous screen
    } catch (error) {
      Alert.alert('Error adding student');
      console.error('Error adding student', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add a Student</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <Button title="Add Student" onPress={addStudent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
