import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import ListStudentScreen from '../Screens/ListStudentScreen';
import AddStudentScreen from '../Screens/AddEditStudentScreen';
import EditStudentScreen from '../Screens/EditStudentScreen';
import AddCourseScreen from '../Screens/AddCourseScreen';
import ListCourseScreen from '../Screens/ListCourseScreen';
import EditCourseScreen from '../Screens/EditCourseScreen';
import CourseChartScreen from '../Screens/CourseChartScreen';
import AddGradeScreen from '../Screens/AddGradeScreen';


const stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="ListStudent" component={ListStudentScreen} />
        <stack.Screen name="AddStudent" component={AddStudentScreen} />
        <stack.Screen name="Details" component={DetailsScreen} />
        <stack.Screen name="EditStudent" component={EditStudentScreen} />
        <stack.Screen name="AddCourse" component={AddCourseScreen}/>
        <stack.Screen name="ListCourse" component={ListCourseScreen}/>
        <stack.Screen name="EditCourse" component={EditCourseScreen}/>
        <stack.Screen name="CourseChart" component={CourseChartScreen}/>
        <stack.Screen name="AddGrade" component={AddGradeScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
    
}