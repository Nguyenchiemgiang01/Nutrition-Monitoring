import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import config from '../../config';
import HeaderMealDetail from './HeaderMealDetail';
const MealDetail = ({ route }) => {
    const navigation = useNavigation()
    const { items } = route.params
    const [permealid, setPermealid] = useState(items.PerMealId);
    const [mealDetails, setMealDetails] = useState([]);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [mealType, setMealType] = useState('uncategorized');
    const getFoodInMeal = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        console.log(permealid)
        try {
            const response = await axios.get(`${config.BASE_URL}/foodinmeal`, {
                headers: headers,
                params: { permealid }
            });

            if (response.status == 201) {
                // console.log(response.data);
                return response.data.perfoodmeal;
            } else {
                console.error('Failed to fetch food items in meal');
            }
        } catch (error) {
            console.error('Error fetching food items in meal:', error);
        }
    };
    useEffect(() => {
        const fetchMealDetails = async () => {
            const details = await getFoodInMeal();
            console.log(details)
            setMealDetails(details);
        };

        fetchMealDetails();


    }, [permealid]);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        // Calculate total calories
        const total = mealDetails.reduce((sum, item) => sum + item.food.Calories, 0);
        setTotalCalories(total);
    }, [mealDetails]);

    const handleadd = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            for (const item of mealDetails) {
                const response = await axios.post(
                    `${config.BASE_URL}/mealdiary`,
                    {
                        "Date": date,
                        "Type": mealType,
                        "foodid": item.food.FoodId
                    },
                    { headers: headers }
                );

                if (response.status === 201) {
                    console.log(`Food item ${item.food.Name} added successfully`);
                } else {
                    console.error('Failed to add food item');
                    Alert.alert('Error', `Failed to add food item: ${item.food.Name}`);
                }
            }
            Alert.alert('Success', 'All food items added to your meal diary');
        } catch (error) {
            console.error('Error adding food items to diary:', error);
            Alert.alert('Error', 'Failed to add food items to diary');
        }
    }
    const deletePersonalMeal = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.delete(`${config.BASE_URL}/personalmeal`, {
                headers: headers,
                data: {
                    permealid: permealid
                }
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Deleted meal successfully');
                navigation.navigate("Meals")
            } else {
                Alert.alert('Error', 'Failed to delete meal');
            }
        } catch (error) {
            console.error('Error deleting personal meal:', error);
            Alert.alert('Error', 'Failed to delete meal');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderMealDetail namemeal={items.Name} ></HeaderMealDetail>
            </View>

            <View style={styles.itemcontainer}>
                <Text style={styles.title}> Foods in meal</Text>
                {mealDetails.map((item, index) => (
                    <View style={styles.fooditem} key={index}>
                        <Text style={styles.textname}>{item.food.Name}</Text>
                        <Text style={styles.calories}>{item.food.Calories} kcal</Text>
                    </View>
                ))}
                <View style={styles.total}>
                    <Text style={styles.texttotal}>Total :  {totalCalories} kcal</Text>
                </View>


                <View style={styles.action}>
                    <TouchableOpacity style={styles.btnaddiary} onPress={handleadd}>
                        <Text style={styles.textadd}>Add to your meal diary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delete} onPress={deletePersonalMeal}>
                        <Text style={styles.textdelete}>Delete meal</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },

    itemcontainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        minHeight: 500,
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textname: {
        fontSize: 18,
    },
    fooditem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 0.5,
        marginBottom: 5
    },
    calories: {
        fontSize: 16,
        color: '#888',
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5,
        marginBottom: 30,
    },
    texttotal: {
        fontSize: 18,
        color: '#404040'
    },
    btnaddiary: {
        padding: 5,
        backgroundColor: '#CCFF99',
        width: 200,
        borderRadius: 10,
        borderWidth: 0.5,
    },

    textadd: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#006666'
    },
    delete: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        marginTop: 10,
    },
    textdelete: {
        fontSize: 17,
        color: '#990000',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});

export default MealDetail;
