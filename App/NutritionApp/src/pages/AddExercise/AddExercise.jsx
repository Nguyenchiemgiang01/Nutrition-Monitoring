
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderAddExercise from '../../components/HeaderAddExercise';
const AddExercise = ({ date }) => {
    const navigation = useNavigation()
    const [searchResults, setSearchResults] = useState();
    const handleSearch = (results) => {

        setSearchResults(results)

    };
    const status = 0
    const navtodetail = (exercise) => {
        navigation.navigate('ExerciseDetail', { exercise, status, date })
    }
    return (
        <View style={styles.container}>
            <HeaderAddExercise onClose={() => navigation.navigate('Diary')} onResults={handleSearch}></HeaderAddExercise>
            <View>
                <ScrollView style={styles.content}>
                    {searchResults && (
                        <View style={styles.listfood}>
                            {searchResults.map((result, index) => (
                                <View key={index} style={styles.containeritem}>
                                    <TouchableOpacity style={styles.fooditem} onPress={() => navtodetail({
                                        "ExerciseId": result.ExerciseId, "Name": result.Name, "CaloriesPerHour": result.CaloriesPerHour
                                    }, { date })} >
                                        <Text style={styles.name} >{result.Name}</Text>
                                        <Text style={styles.calories}>{result.CaloriesPerHour} kcal/hr</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>)}

                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    containeritem: {},
    fooditem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        height: 50,
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    calories: {
        fontSize: 16,
        color: '#888',
    },
});

export default AddExercise;
