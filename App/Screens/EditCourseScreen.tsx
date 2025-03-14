import React, { useState, useEffect } from 'react';
import { View, Alert, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import db from "../../firebaseConfig";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";


const EditCourseScreen = () => {
    const navigation  = useNavigation();
    const route = useRoute();
    const { courseId } = route.params;
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            const docRef = doc(db, 'courses', courseId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const course = docSnap.data();
                setName(course.name);
                setCode(course.code);
                setDescription(course.description);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleSave = async () => {
        const courseRef = doc(db, 'courses', courseId);
        try {
            await updateDoc(courseRef, {
                name: name,
                code: code,
                description: description
            });
            Alert.alert('Success', 'Course updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update course');
            console.error('Update Error:', error);
        }
    };


  return (
    <View style={styles.container}>
      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Course Name"
      />
      <CustomTextInput
        value={code}
        onChangeText={setCode}
        placeholder="Course Code"
      />
      <CustomTextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description of the Course"
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

export default EditCourseScreen;