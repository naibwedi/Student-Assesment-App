import react from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export default function ListStudentScreen({ navigation }: { navigation: NavigationProp<any> }) {
    
    const students = [{id: 1, name: 'John Doe', age: 20 }, { id:2, name: 'Jane Doe', age: 21 }];

    return (
        <View>
            <Text >List of Students</Text>
            <FlatList
             data={students}
             keyExtractor={item => item.id.toString()}
             renderItem={({ item }) => (
                 <Text>{item.name} - {item.age}</Text>
             )}
            />
            <Button title="Add Student" onPress={() => navigation.navigate('AddStudent')} />
        </View>
    );
}