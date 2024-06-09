import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import HeaderFoodDetail from './HeaderFoodDetail';
import CustomPicker from './CustomPicker';
import Summary from './Sumary';
import ParamDetail from './ParamDetail';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
const ExerciseDetail = ({ route, navigation }) => {
    const { exercise, status, selecteddate } = route.params;
    const mins = exercise.Time

    const [time, setTime] = useState('')



    const [selectedMeal, setSelectedMeal] = useState('');
    useEffect(() => {
        if (exercise.Time) {
            setTime(exercise.Time.toString());
        }
        console.log("date", selecteddate)
    }, [exercise]);

    const DATA = [
        { key: 'Calories', value: - exercise.CaloriesPerHour * time / 60 },
    ];
    const handleSave = () => {
        // Implement the save functionality here
    };




    const handleAdd = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.post(config.BASE_URL + '/exercise', {
                Date: moment(selecteddate).format('YYYY-MM-DD'),
                Time: time,
                ExerciseId: exercise.ExerciseId,
            }, { headers });
            if (response.status == 201) {
                Alert.alert('', response.data.message)
                navigation.goBack()
            }


        } catch (error) {
            console.error('Error adding exercise to meal diary:', error);

        }
    };
    const handleRemove = () => {
        // Implement the add functionality here
    };
    return (
        <View style={styles.container}>
            <HeaderFoodDetail foodName={exercise.Name} onClose={() => navigation.goBack()}></HeaderFoodDetail>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.headcontent}>
                        <View style={styles.infoitem}>
                            <Text style={styles.title}>Time</Text>
                            <View style={styles.valuetime}>
                                <TextInput style={styles.value} value={time} onChangeText={(text) => setTime(text)}
                                    editable={true}></TextInput>
                                <Text style={styles.unit}>minutes</Text>
                            </View>

                        </View>
                    </View>
                    <View style={styles.detail}>
                        <ParamDetail data={DATA}></ParamDetail>
                    </View>
                    <View style={styles.buttonbottom}>
                        {status === 1 ? (
                            <View style={styles.added}>
                                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.remove} onPress={handleRemove}>
                                    <Text style={styles.removeText}>Remove from diary</Text>
                                </TouchableOpacity>
                            </View>

                        ) : (
                            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                                <Text style={styles.buttonText}>Add to Diary</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                </View>
            </ScrollView>


        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#003333',
        paddingLeft: 10
    },
    detail: {
        fontSize: 18,
        marginVertical: 5,
    },
    content: {
        flex: 1,
        backgroundColor: '#FDFDF8',
        padding: 10,
    },
    headcontent: {
        marginTop: 20,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    infoitem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 10,
        paddingVertical: 10

    },
    valuetime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    unit: {
        marginLeft: 10,
        color: '#404040',
        fontSize: 16
    },
    value: {
        width: 100,
        height: 40,
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1
    },

    buttonbottom: {
        marginVertical: 10,
    },
    added: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        marginRight: 10,
        alignItems: 'center'
    },

    button: {
        backgroundColor: '#000066',
        paddingHorizontal: 30,
        paddingVertical: 4,
        borderRadius: 15,
        alignItems: 'center'

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    remove: {
        marginLeft: 20
    },
    removeText: {
        fontSize: 16,
        color: '#009999',
        fontWeight: 'bold',

    }
});

export default ExerciseDetail;
