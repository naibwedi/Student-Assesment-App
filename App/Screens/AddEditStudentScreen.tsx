import react from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListStudentScreen() {

    return (
        <View>
            <Text>List of Students</Text>
            {/* <Button title="Add Student" onPress={() => navigation.navigate('AddStudent')} /> */}
        </View>
    );
}