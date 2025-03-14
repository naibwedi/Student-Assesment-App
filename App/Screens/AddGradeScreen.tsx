import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from "firebase/firestore"; // <-- Make sure everything is imported from 'firebase/firestore'
import db from "../../firebaseConfig";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { Picker } from "@react-native-picker/picker";

const letterGradeValue: { [key: string]: number } = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2,
  "F": 1,
};

const AddGradeScreen = ({ navigation }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grade, setGrade] = useState("A");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentSnapshot = await getDocs(collection(db, "students"));
      setStudents(studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchCourses = async () => {
      const courseSnapshot = await getDocs(collection(db, "courses"));
      setCourses(courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const addGrade = async () => {
    console.log("Selected Course:", selectedCourse, "Selected Student:", selectedStudent);
    if (!selectedStudent || !selectedCourse) {
      Alert.alert("Error", "Please select a student and a course.");
      return;
    }
  
    try {
      const gradeDocRef = doc(db, `courses/${selectedCourse}/grades`, selectedStudent);
      console.log("gradeDocRef path:", gradeDocRef.path);
  
      const docSnap = await getDoc(gradeDocRef);
      console.log("docSnap.exists():", docSnap.exists());
  
      if (docSnap.exists()) {
        const oldGrade = docSnap.data().grade; // e.g., "B"
        console.log("oldGrade:", oldGrade);
        console.log("newGrade:", grade);
  
        // Compare old vs. new
        if (letterGradeValue[grade] > letterGradeValue[oldGrade]) {
          await updateDoc(gradeDocRef, { grade });
          Alert.alert("Success", `Grade updated to ${grade} (was ${oldGrade})!`);
        } else {
          Alert.alert("No Update", `Existing grade (${oldGrade}) is higher or equal.`);
        }
      } else {
        // doc doesn't exist => create new
        await setDoc(gradeDocRef, {
          studentId: selectedStudent,
          grade: grade,
          courseId: selectedCourse,
        });
        Alert.alert("Success", "Grade added successfully!");
      }
  
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to add/update grade.");
      console.error("Add Grade Error:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedStudent} onValueChange={setSelectedStudent}>
        <Picker.Item label="Select Student" value="" />
        {students.map(student => (
          <Picker.Item key={student.id} label={student.name} value={student.id} />
        ))}
      </Picker>

      <Picker selectedValue={selectedCourse} onValueChange={setSelectedCourse}>
        <Picker.Item label="Select Course" value="" />
        {courses.map(course => (
          <Picker.Item key={course.id} label={course.name} value={course.id} />
        ))}
      </Picker>

      <Picker selectedValue={grade} onValueChange={setGrade}>
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
        <Picker.Item label="F" value="F" />
      </Picker>

      <CustomButton title="Add Grade" onPress={addGrade} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default AddGradeScreen;
