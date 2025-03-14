import React, { useState, useEffect } from 'react';
import { View, Alert, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import db from "../../firebaseConfig";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

const EditStudentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentId } = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      const docRef = doc(db, "students", studentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const student = docSnap.data();
        setName(student.name);
        setAge(student.age.toString());
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSave = async () => {
    const studentRef = doc(db, "students", studentId);
    try {
      await updateDoc(studentRef, {
        name: name,
        age: parseInt(age, 10)
      });
      Alert.alert("Success", "Student updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update student");
      console.error("Update Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Student Name"
      />
      <CustomTextInput
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
      />
      <CustomButton
        title="Save Changes"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  }
});

export default EditStudentScreen;
