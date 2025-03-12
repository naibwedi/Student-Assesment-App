import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import  db  from '../../firebaseConfig';

export default function ListStudentScreen() {
  const navigation = useNavigation();
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [searchTerm]);

  const fetchStudents = async () => {
    const studentsCollection = collection(db, "students");
    const q = searchTerm ? query(studentsCollection, where("name", ">=", searchTerm), where("name", "<=", searchTerm + '\uf8ff')) : studentsCollection;
    const querySnapshot = await getDocs(q);
    setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = (studentId: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this student?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => deleteStudent(studentId) },
    ]);
  };

  const deleteStudent = async (studentId: string) => {
    await deleteDoc(doc(db, "students", studentId));
    fetchStudents();  // Refresh the list after deletion
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text style={styles.studentText}>{item.name} | Age: {item.age}</Text>
            <CustomButton title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        )}
      />
      <CustomButton
        title="Add Student"
        onPress={() => navigation.navigate('AddStudent')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  studentText: {
    flex: 1,
  },
});
