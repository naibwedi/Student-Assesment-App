import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import ListStudentScreen from '../Screens/ListStudentScreen';
import AddStudentScreen from '../Screens/AddEditStudentScreen';


const stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="ListStudent" component={ListStudentScreen} />
        <stack.Screen name="AddStudent" component={AddStudentScreen} />
        <stack.Screen name="Details" component={DetailsScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
    
}