import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import moment from 'moment';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native';
import MealItem from '../../components/MealItem';
import { useNavigation } from '@react-navigation/native';
export default function Meals() {
    const navigation = useNavigation()

    const goCreatMeal = () => {
        navigation.navigate('CreateMeal')
    }
    const [personalMeals, setPersonalMeals] = useState([]);

    const fetchPersonalMeals = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/personalmeal`, {
                headers: headers
            });

            if (response.status === 201) {
                console.log(response.data.per_meal)
                setPersonalMeals(response.data.per_meal);
            } else {

            }
        } catch (error) {

        }
    };

    useEffect(() => {
        fetchPersonalMeals();
    }, []);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.maincontainer}>
                <TouchableOpacity onPress={goCreatMeal}>
                    <View style={styles.createContainer}>
                        <View style={styles.iconpencontainer}>
                            <Ionicons name="document-text" size={40} color={"#fff"}></Ionicons>
                        </View>
                        <View style={styles.textright}>
                            <Text style={styles.title}>Creat a meal</Text>
                            <Text style={styles.textcontent}>Creating meals will help you add your meal log faster</Text>
                        </View>

                    </View>
                </TouchableOpacity>

                <View style={styles.listmeal}>
                    <Text style={styles.texttitle}> Your meals</Text>
                    <View style={styles.listmealitem}>
                        {personalMeals.map((item, index) => (
                            <MealItem key={index} items={item}></MealItem>
                        ))}
                    </View>
                </View>



            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    createContainer: {
        backgroundColor: "#fff",
        minHeight: 150,
        borderRadius: 10,
        borderWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listmeal: {
        marginTop: 10,
        backgroundColor: "#fff",
        minHeight: 350,
        borderRadius: 10,
        borderWidth: 0.5,
        flexDirection: 'column',
    },
    listmealitem: {
        paddingHorizontal: 15
    },
    textright: {
        width: 220,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    textcontent: {
        color: '#606060'
    },
    iconpencontainer: {

        margin: 30,
        padding: 20,
        borderRadius: 40,
        width: 80,
        backgroundColor: '#009999'
    },


    header: {
        flexDirection: 'row',
        backgroundColor: '#6CB745',
        borderWidth: 1,
        borderColor: '#808080',
        paddingVertical: 8,
    },
    texttitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    },
    btn: {
        paddingLeft: 20,
        paddingRight: 15,
        backgroundColor: '#E5FFCC',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRightColor: '#4C9900'
    },
    textbutton: {
        color: '#4C9900',
        fontWeight: 'bold'
    }
});
