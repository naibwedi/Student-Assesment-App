import React, { useState, useEffect, useCallback } from "react";
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
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { ListItem, Button, Icon } from "react-native-elements";

export default function ListCourseScreen() {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<any[]>([]); // ✅ Use an array
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async (search: string) => {
    const courseCollection = collection(db, "courses");
    const q = search
      ? query(
          courseCollection,
          where("name", ">=", search),
          where("name", "<=", search + "\uf8ff")
        )
      : courseCollection;
    const querySnapshot = await getDocs(q);
    setCourses(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  // 2) In useEffect, just call fetchCourses
  useFocusEffect(
    useCallback(() => {
      fetchCourses(searchTerm);
    }, [searchTerm])
  );

  const handleDelete = (courseId: string) => {
    console.log("Delete button clicked for course ID:", courseId);
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this course?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            console.log("Delete confirmed for course ID:", courseId);
            deleteCourse(courseId);
          },
        },
      ]
    );
  };

  const deleteCourse = async (courseId: string) => {
    try {
      // Reference to the grades collection under the course
      const gradesCollectionRef = collection(db, `courses/${courseId}/grades`);
      const gradesSnapshot = await getDocs(gradesCollectionRef);
  
      // Delete all grade documents in the course
      for (const gradeDoc of gradesSnapshot.docs) {
        await deleteDoc(doc(db, `courses/${courseId}/grades`, gradeDoc.id));
      }
  
      // Now delete the course document
      await deleteDoc(doc(db, "courses", courseId));
      console.log("Course and all its grades deleted successfully.");
      fetchCourses(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting course and grades:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search by course name"
      />
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider containerStyle={styles.listItemContainer}>
            {/* <Icon
              name="book"
              type="font-awesome"
              color="#4ecca3"
              size={28}
              containerStyle={{ marginRight: 10 }}
            /> */}
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.code}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>

            {/* View Chart Button */}
            <Button
              icon={
                <Icon
                  name="bar-chart"
                  type="font-awesome"
                  size={16}
                  color="#fff"
                />
              }
              title=" Chart"
              buttonStyle={styles.chartButton}
              onPress={() =>
                navigation.navigate("CourseChart", {
                  courseId: item.id,
                })
              }
            />

            {/* Edit Button */}
            <Button
              icon={
                <Icon name="edit" type="font-awesome" size={16} color="#fff" />
              }
              buttonStyle={styles.editButton}
              onPress={() =>
                navigation.navigate("EditCourse", {
                  courseId: item.id,
                })
              }
            />

            {/* Delete Button */}
            <Button
              icon={
                <Icon name="trash" type="font-awesome" size={16} color="#fff"  />
              }
              buttonStyle={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            />
          </ListItem>
        )}
      />
      <View style={styles.buttons}>
        {/* <CustomButton
          title="View Grade Distribution"
          onPress={() => navigation.navigate("CourseChart")}
          color="green"
          style={{ margin: 10 }}
        /> */}

        <CustomButton
          title="Add Grade"
          onPress={() => navigation.navigate("AddGrade")}
        />

        <CustomButton
          title="Add Course"
          onPress={() => navigation.navigate("AddCourse")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red", 
  },
  editButton: { 
    backgroundColor: "orange",
  },
  chartButton: {
    backgroundColor: "#4169E1",
  },
  listItemContainer: {
    marginVertical: 5,
    borderRadius: 10,
  },
});
