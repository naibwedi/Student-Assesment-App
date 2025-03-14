import React  from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import  db  from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

export default function AddCourseScreen() {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('');
  const [description, setDescription] = React.useState('');

  const addCourse = async () => {
    if (!name || !code || !description) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    try {
      await addDoc(collection(db, "courses"), {
        name: name,
        code: code,
        description: description
      });
      Alert.alert('Success', 'Course added successfully');
      setName('');
      setCode('');
      setDescription('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error adding course');
      console.error('Error adding course', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add a Course</Text>
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
        placeholder="Course Description"
      />
      <CustomButton title="Add Course" onPress={addCourse} />
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
    });

