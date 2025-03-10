import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ListStudentScreen() {
  const navigation = useNavigation();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <View>
      <Text style={{fontSize:24, fontWeight: 'bold'}}>List of Students</Text>
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>-  {item.name}    |   Age: {item.age}</Text>  // Adjust according to the data structure
        )}
      />
      <Button title="Add Student" onPress={() => navigation.navigate('AddStudent') } />
    </View>
  );
}