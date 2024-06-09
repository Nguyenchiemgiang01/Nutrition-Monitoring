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
    console.log("route", route)
    const { food, status, date, iscreatemeal, group } = route.params;
    console.log("food", food, date, group)
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
        { key: 'Protein', value: food.protein || food.ProteinContent || food.Protein + ' g' },
        { key: 'Carbs', value: food.carbs || food.CarbohydrateContent || food.Carbohydrate + ' g' },
        { key: 'Fat', value: food.fat || food.FatContent || food.Fat + ' g' },
        { key: 'Sodium', value: food.sodium || food.SodiumContent || food.Sodium + ' g' },
        { key: 'Fiber', value: food.fiber || food.FiberContent || food.Fiber + ' g' },
        { key: 'Sugar', value: food.sugar || food.SugarContent || food.Sugar + ' mg' },
        { key: 'Cholesterol', value: food.cholesterol || food.CholesterolContent || food.Cholesterol + ' mg' },

    ];
    const handleAddMeal = () => {
        const foodids = food.foodid
        const foodname = food.name
        const foodcalories = food.calories
        navigation.navigate("CreateMeal", { foodids, foodname, foodcalories })
    };


    const handleSave = () => {

    }

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
                foodid: food.foodid || food.RecipeId || food.FoodId,
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
    const handleRemove = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.delete(config.BASE_URL + '/mealdiary', {
                data: {
                    Date: moment(date).format('YYYY-MM-DD'),
                    Type: food.category,
                    foodid: food.foodid || food.RecipeId || food.FoodId,
                },
                headers: headers
            });
            if (response.status == 200) {
                Alert.alert('', response.data.message);
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error removing food from meal diary:', error);
        }
    };
    return (
        <View style={styles.container}>
            <HeaderFoodDetail foodName={food.name || food.Name} onClose={() => navigation.goBack()}></HeaderFoodDetail>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.headcontent}>
                        {/* <View style={styles.infoitem}>
                            <Text style={styles.title}>Serving Size</Text>
                            <TextInput style={styles.value} value={size} onChangeText={(text) => setSize(text)}
                                editable={true}></TextInput>
                        </View> */}
                        {iscreatemeal === 0 && group == 1 ? (
                            <View style={styles.infoitem}>
                                <Text style={styles.title}>Group</Text>
                                <CustomPicker
                                    options={mealOptions}
                                    selectedValue={selectedMeal}
                                    onValueChange={(value) => setSelectedMeal(value)}
                                />
                            </View>
                        ) : (<View></View>)}



                    </View>
                    <View style={styles.sumary}>
                        <Summary protein={food.protein || food.ProteinContent || food.Protein} netCarbs={food.carbs || food.CarbohydrateContent || food.Carbohydrate} fat={food.fat || food.FatContent || food.Fat}></Summary>
                    </View>
                    <View style={styles.detail}>
                        <ParamDetail data={DATA}></ParamDetail>
                    </View>
                    {iscreatemeal === 0 ? (<View style={styles.buttonbottom}>
                        {status === 1 ? (
                            <View style={styles.added}>
                                <TouchableOpacity style={styles.remove} onPress={handleRemove}>
                                    <Text style={styles.removeText}>Remove from diary</Text>
                                </TouchableOpacity>
                            </View>

                        ) : (
                            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                                <Text style={styles.buttonText}>Add to Diary</Text>
                            </TouchableOpacity>
                        )}
                    </View>) : (
                        <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
                            <Text style={styles.buttonText}>Add to your meal</Text>
                        </TouchableOpacity>
                    )}


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
