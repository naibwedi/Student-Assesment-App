import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { ListItem, Button, Icon } from "react-native-elements";

export default function ListStudentScreen() {
  const navigation = useNavigation();
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1) Moved fetch logic outside useEffect
  const fetchStudents = async (search: string) => {
    const studentsCollection = collection(db, "students");
    const q = search
      ? query(
          studentsCollection,
          where("name", ">=", search),
          where("name", "<=", search + "\uf8ff")
        )
      : studentsCollection;

    const querySnapshot = await getDocs(q);
    setStudents(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  // 2) In useEffect, just call fetchStudents
  useFocusEffect(
    useCallback(() => {
      fetchStudents(searchTerm); // 🔄 Refresh when screen comes into focus
    }, [searchTerm])
  );

  const handleDelete = (studentId: string) => {
    console.log("Delete button clicked for student ID:", studentId);
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this student?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            console.log("Delete confirmed for student ID:", studentId);
            deleteStudent(studentId);
          },
        },
      ]
    );
  };

  const deleteStudent = async (studentId: string) => {
    try {
      // Fetch all courses to find grades linked to the student
      const coursesSnapshot = await getDocs(collection(db, "courses"));
  
      for (const courseDoc of coursesSnapshot.docs) {
        const gradesCollectionRef = collection(db, `courses/${courseDoc.id}/grades`);
        const gradeDocRef = doc(gradesCollectionRef, studentId);
        
        // Check if grade exists for this student in the course and delete it
        const gradeDocSnap = await getDoc(gradeDocRef);
        if (gradeDocSnap.exists()) {
          await deleteDoc(gradeDocRef);
        }
      }
  
      // Now delete the student document
      await deleteDoc(doc(db, "students", studentId));
      console.log("Student and their grades deleted successfully.");
      fetchStudents(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting student and grades:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search by name"
      />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>Age: {item.age}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
            title={" Edit"}
              icon={
                <Icon name="edit" type="font-awesome" size={16} color="#fff" />
              }
              // 3) pass refreshList as an arrow fn calling fetch
              onPress={() =>
                navigation.navigate("EditStudent", {
                  studentId: item.id,
                })
              }
            />
            <Button
             title=" Delete"
              icon={
                <Icon name="trash"  type="font-awesome" size={16} color="#fff" />
              }
              
              buttonStyle={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
              buttonStyle={{ backgroundColor: "red" }}
            />
          </ListItem>
        )}
      />
      <CustomButton
        title="Add Student"
        onPress={() => navigation.navigate("AddStudent")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
