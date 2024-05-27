import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import HeaderFoodDetail from './HeaderFoodDetail';
import CustomPicker from './CustomPicker';
import Summary from './Sumary';
import ParamDetail from './ParamDetail';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
const FoodDetail = ({ route, navigation }) => {
    const { food, status, date } = route.params;
    const a = String(food.calories)
    const [size, setSize] = useState('')
    const [selectedMeal, setSelectedMeal] = useState('');
    const mealOptions = [
        { label: 'Uncategorized', value: 'uncategorized' },
        { label: 'Snacks', value: 'snacks' },
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' }
    ];
    const DATA = [
        { key: 'Protein', value: food.protein + 'g' },
        { key: 'Carbs', value: food.carbs + 'g' },
        { key: 'Fat', value: food.fat + 'g' },
        { key: 'Sodium', value: food.sodium + 'g' },
        { key: 'Fiber', value: food.fiber + 'g' },
        { key: 'Sugar', value: food.sugar + 'mg' },
        { key: 'Cholesterol', value: food.cholesterol + 'mg' },

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
            const response = await axios.post(config.BASE_URL + '/mealdiary', {
                Date: moment(date).format('YYYY-MM-DD'),
                Type: selectedMeal,
                foodid: food.foodid,
                // servingsize: size
            }, { headers });
            if (response.status == 201) {
                Alert.alert('', response.data.message)
                navigation.goBack()
            }


        } catch (error) {
            console.error('Error adding food to meal diary:', error);

        }
    };
    const handleRemove = () => {
        // Implement the add functionality here
    };
    return (
        <View style={styles.container}>
            <HeaderFoodDetail foodName={food.name} onClose={() => navigation.goBack()}></HeaderFoodDetail>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.headcontent}>
                        {/* <View style={styles.infoitem}>
                            <Text style={styles.title}>Serving Size</Text>
                            <TextInput style={styles.value} value={size} onChangeText={(text) => setSize(text)}
                                editable={true}></TextInput>
                        </View> */}
                        <View style={styles.infoitem}>
                            <Text style={styles.title}>Group</Text>
                            <CustomPicker
                                options={mealOptions}
                                selectedValue={selectedMeal}
                                onValueChange={(value) => setSelectedMeal(value)}
                            />
                        </View>

                    </View>
                    <View style={styles.sumary}>
                        <Summary protein={food.protein} netCarbs={food.carbs} fat={food.fat}></Summary>
                    </View>
                    <View style={styles.detail}>
                        <ParamDetail data={DATA}></ParamDetail>
                    </View>
                    <View style={styles.buttonbottom}>
                        {status === 1 ? (
                            <View style={styles.added}>
                                <TouchableOpacity style={styles.button} onPress={handleSave}>
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

export default FoodDetail;
