import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Homepage/HomeScreen"
import { View, StyleSheet } from 'react-native';
import style from '../Userpage/Userpagestyle';
import Footer from '../../components/Footer';
import Diary from '../Diary/Diary'
import FoodDetail from '../../components/FoodDetail';
import FoodSearch from '../../pages/FoodSearch/FoodSearch';
import AddExercise from '../AddExercise/AddExercise';
import ExerciseDetail from '../../components/ExerciseDetail';
const Stack = createNativeStackNavigator();

export default function UserpageScreen() {
    return (
        <View style={styles.container}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Diary" component={Diary} />
                <Stack.Screen name="FoodDetail" component={FoodDetail} />
                <Stack.Screen name='FoodSearch' component={FoodSearch} />
                <Stack.Screen name='AddExercise' component={AddExercise} />
                <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
            </Stack.Navigator>
            <Footer ></Footer >
        </View >


    )
}
const styles = StyleSheet.create(style)
