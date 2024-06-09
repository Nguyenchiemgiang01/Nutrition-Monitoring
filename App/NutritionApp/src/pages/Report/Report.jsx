import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import moment from 'moment';
import axios from 'axios';
export default function Report() {
    const [aconsume, setAConsume] = useState([]);
    const [sevenconsume, setSevenConsume] = useState([]);
    const [monthconsume, setMonthConsume] = useState([]);
    const [nutrients, setNutrients] = useState([]);
    const [sevenNutrients, setSevenNutrients] = useState([]);
    const [monthNutrients, setMonthNutrients] = useState([]);
    const getListConsume = async (date_from, date_to) => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/consume`, {
                params: { date_from, date_to },
                headers
            });

            if (response) {
                return response.data;
            } else {
                console.error('No record found or other error');
                return [];
            }
        } catch (error) {

            return [];
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const today = moment().format('YYYY-MM-DD');
            const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');

            const aconsumeData = await getListConsume(today, today);
            const sevenconsumeData = await getListConsume(sevenDaysAgo, today);
            const monthconsumeData = await getListConsume(startOfMonth, today);

            setAConsume(aconsumeData);
            setSevenConsume(sevenconsumeData);
            setMonthConsume(monthconsumeData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const calculateNutrients = (consumeList) => {
            const totalNutrients = {
                Calories: 0,
                Fat: 0,
                Cholesterol: 0,
                Sodium: 0,
                Carbohydrate: 0,
                Fiber: 0,
                Sugar: 0,
                Protein: 0,
            };

            consumeList.forEach(item => {

                totalNutrients.Calories += item.Calories || 0;
                totalNutrients.Fat += item.Fat || 0;
                totalNutrients.Cholesterol += item.Cholesterol || 0;
                totalNutrients.Sodium += item.Sodium || 0;
                totalNutrients.Carbohydrate += item.Carbohydrate || 0;
                totalNutrients.Fiber += item.Fiber || 0;
                totalNutrients.Sugar += item.Sugar || 0;
                totalNutrients.Protein += item.Protein || 0;
                console.log(totalNutrients.Fat)
            });

            return [
                { name: 'Calories', amount: `${totalNutrients.Calories} kcal` },
                { name: 'Fat ', amount: `${totalNutrients.Fat} g` },
                { name: 'Cholesterol ', amount: `${totalNutrients.Cholesterol} mg` },
                { name: 'Sodium ', amount: `${totalNutrients.Sodium} mg` },
                { name: 'Carbohydrate ', amount: `${totalNutrients.Carbohydrate} g` },
                { name: 'Fiber ', amount: `${totalNutrients.Fiber} g` },
                { name: 'Sugar ', amount: `${totalNutrients.Sugar} g` },
                { name: 'Protein ', amount: `${totalNutrients.Protein} g` },
            ];
        };

        setSevenNutrients(calculateNutrients(sevenconsume));
    }, [sevenconsume]);
    useEffect(() => {
        const calculateNutrients = (consumeList) => {
            const totalNutrients = {
                Calories: 0,
                Fat: 0,
                Cholesterol: 0,
                Sodium: 0,
                Carbohydrate: 0,
                Fiber: 0,
                Sugar: 0,
                Protein: 0,
            };

            consumeList.forEach(item => {

                totalNutrients.Calories += item.Calories || 0;
                totalNutrients.Fat += item.Fat || 0;
                totalNutrients.Cholesterol += item.Cholesterol || 0;
                totalNutrients.Sodium += item.Sodium || 0;
                totalNutrients.Carbohydrate += item.Carbohydrate || 0;
                totalNutrients.Fiber += item.Fiber || 0;
                totalNutrients.Sugar += item.Sugar || 0;
                totalNutrients.Protein += item.Protein || 0;
                console.log(totalNutrients.Fat)
            });

            return [
                { name: 'Calories', amount: `${totalNutrients.Calories} kcal` },
                { name: 'Fat ', amount: `${totalNutrients.Fat} g` },
                { name: 'Cholesterol ', amount: `${totalNutrients.Cholesterol} mg` },
                { name: 'Sodium ', amount: `${totalNutrients.Sodium} mg` },
                { name: 'Carbohydrate ', amount: `${totalNutrients.Carbohydrate} g` },
                { name: 'Fiber ', amount: `${totalNutrients.Fiber} g` },
                { name: 'Sugar ', amount: `${totalNutrients.Sugar} g` },
                { name: 'Protein ', amount: `${totalNutrients.Protein} g` },
            ];
        };

        setMonthNutrients(calculateNutrients(monthconsume));
        console.log("month", sevenNutrients)
    }, [monthconsume]);

    useEffect(() => {
        const nutrientsData = [
            { name: 'Calories', amount: `${aconsume.Calories || 0} kcal` },
            { name: 'Fat', amount: `${aconsume.Fat || 0} g` },
            { name: 'Cholesterol ', amount: `${aconsume.Cholesterol || 0} mg` },
            { name: 'Sodium ', amount: `${aconsume.Sodium || 0} mg` },
            { name: 'Carbohydrate ', amount: `${aconsume.Carbohydrate || 0} g` },
            { name: 'Fiber ', amount: `${aconsume.Fiber || 0} g` },
            { name: 'Sugar ', amount: `${aconsume.Sugar || 0} g` },
            { name: 'Protein ', amount: `${aconsume.Protein || 0} g` },
        ];
        setNutrients(nutrientsData);
    }, [aconsume]);

    const [displayedNutrients, setDisplayedNutrients] = useState(nutrients);

    const handleDisplayAConsume = () => setDisplayedNutrients(nutrients);
    const handleDisplaySevenNutrients = () => setDisplayedNutrients(sevenNutrients);
    const handleDisplayMonthNutrients = () => setDisplayedNutrients(monthNutrients);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.maincontainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity title="Today" onPress={handleDisplayAConsume} style={styles.btn}><Text style={styles.textbutton}>Today</Text></TouchableOpacity>
                    <TouchableOpacity title="Last7Days" onPress={handleDisplaySevenNutrients} style={styles.btn} ><Text style={styles.textbutton}>Last 7 Days</Text></TouchableOpacity>
                    <TouchableOpacity title="ThisMonth" onPress={handleDisplayMonthNutrients} style={styles.btn}><Text style={styles.textbutton}>This Month</Text></TouchableOpacity>
                </View>
                <View style={styles.nutritondetails}>
                    <FlatList
                        data={displayedNutrients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.cellname}>{item.name}</Text>
                                <Text style={styles.cellvalue}>{item.amount}</Text>
                            </View>
                        )}
                        ListHeaderComponent={() => (
                            <View style={styles.header}>
                                <Text style={[styles.cellleft, styles.headerText]}>Nutrient</Text>
                                <Text style={[styles.cellright, styles.headerText]}>Amount</Text>
                            </View>
                        )}
                    />
                </View>



            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        // backgroundColor: '#fff',
    },
    maincontainer: {
        backgroundColor: '#fff',
        minHeight: 520,
        padding: 8,
        borderRadius: 10,
        borderWidth: 0.5,


    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#6CB745',
        borderWidth: 1,
        borderColor: '#808080',
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#ccc',
        borderRightColor: '#ccc',
    },
    cellleft: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 8,
        color: '#fff'

    },
    cellright: {
        flex: 1,
        textAlign: 'right',
        paddingHorizontal: 8,
        color: '#fff'

    },
    cellvalue: {
        flex: 1,
        textAlign: 'right',
        paddingHorizontal: 8,

    },
    cellname: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 8,
        fontWeight: 'bold',

    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    nutritondetails: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
