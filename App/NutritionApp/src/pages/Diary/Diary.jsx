import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import HeaderDiary from '../../components/HeaderDiary';
import moment from 'moment';
import ProgressBar from '../../components/ProgressBar'
import FoodCategory from '../../components/FoodCategory';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../../config';

import { useNavigation } from '@react-navigation/native';

export default function Diary() {
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
    const [mealDiary, setMealDiary] = useState({});
    const [exercise, setExercise] = useState({});
    const navigation = useNavigation()


    const handleDateChange = (newDate) => {
        setCurrentDate(moment(newDate).format('YYYY-MM-DD'));
        console.log('Selected Date:', newDate);
    };
    const sampleItems = [
        { name: 'Apple', calories: 95 },
        { name: 'Banana', calories: 105 },

    ];
    const fetchMealDiary = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log(accessToken)
        if (!accessToken) {
            return;
        }
        try {
            const response = await axios.get(config.BASE_URL + `/mealdiary/${currentDate}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status == 201) {
                setMealDiary(response.data.mealdiarys);
                console.log(exercise)
            } else if (response.status == 404) {
                setMealDiary({});
            }
        } catch (error) {

            setMealDiary({});
        }
    };

    const fetchExercise = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (!accessToken) {
            return;
        }
        try {
            const response = await axios.get(config.BASE_URL + `/exercise/${currentDate}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                setExercise(response.data.exercises);
            } else if (response.status === 404) {
                setExercise([]);
            }
        } catch (error) {
            console.error(error);
            setExercise([]);
        }
    };


    useEffect(() => {
        fetchMealDiary(currentDate);
        fetchExercise(currentDate)
    }, [currentDate]);


    const getFirstFiveItems = (category) => {
        return mealDiary[category] ? mealDiary[category].slice(0, 5).map(item => ({
            name: item.Name,
            calories: item.Calories,
            protein: item.Protein,
            carbs: item.Carbohydrate,
            fat: item.Fat,
            sodium: item.Sodium,
            fiber: item.Fiber,
            sugar: item.Sugar,
            cholesterol: item.Cholesterol

        })) : [];
    };
    return (
        <View style={styles.container}>
            <HeaderDiary onDateChange={handleDateChange}></HeaderDiary>
            <ScrollView style={styles.content}>
                <View style={styles.target}>
                    <Text style={styles.texttarget}> Target</Text>
                    <ProgressBar percentage={60} />
                </View>

                <View style={styles.categories}>
                    <FoodCategory categoryName="Uncategorized" items={getFirstFiveItems('uncategorized')} date={currentDate}></FoodCategory>
                </View>
                <View style={styles.categories}>
                    <FoodCategory categoryName="Breakfast" items={getFirstFiveItems('breakfast')} date={currentDate}></FoodCategory>
                </View>
                <View style={styles.categories}>
                    <FoodCategory categoryName="Lunch" items={getFirstFiveItems('lunch')} date={currentDate}></FoodCategory>
                </View>
                <View style={styles.categories}>
                    <FoodCategory categoryName="Dinner" items={getFirstFiveItems('dinner')} date={currentDate}></FoodCategory>
                </View>
                <View style={styles.categories}>
                    <FoodCategory categoryName="Snacks" items={getFirstFiveItems('snacks')} date={currentDate}></FoodCategory>
                </View>
                <View style={styles.exercises}>
                    {exercise.length > 0 ? (
                        <View style={styles.itemsContainer}>
                            {exercise.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('ExerciseDetail', { exercise: item, date: currentDate, status: 1 })}>
                                    <View style={styles.titlecontainer}>
                                        <Text style={styles.title}> {item.Name}</Text>
                                    </View>
                                    <Text style={styles.calor}> -{(item.Time * item.CaloriesPerHour / 60).toFixed(1)} kcal</Text>
                                    <Text style={styles.time}>{item.Time} mins</Text>

                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <Text></Text>
                    )}

                </View>
                <View style={styles.bottomscroll}></View>
            </ScrollView>
        </View>


    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',


        },
        header: {
            backgroundColor: '#fff'
        },
        target: {
            width: '94%',
            marginLeft: 10,
            marginTop: 3

        },
        texttarget: {
            marginBottom: 5,
            fontSize: 16,

        },
        content: {
            flex: 1,
            backgroundColor: '#FDFDF8',
            paddingTop: 20,
            paddingHorizontal: 5,
            height: '120%'
        },
        categories: {
            marginTop: 20
        },
        exercises: {

        },
        itemsContainer: {
            marginTop: 16,
            flexDirection: 'row',
            flexWrap: 'wrap',  // This allows wrapping
            justifyContent: 'space-around',  // Space between items
        },
        item: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: 150,
            marginBottom: 20
        },
        titlecontainer: {
            width: 120
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#009999',
            marginBottom: 8,
        },
        calor: {
            fontSize: 20,
            color: '#7F00FF'
        },
        time: {
            color: '#404040'
        },
        bottomscroll: {
            height: 100
        }

    }
)
