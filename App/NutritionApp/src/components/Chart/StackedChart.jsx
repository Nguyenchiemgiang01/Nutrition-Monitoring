import React, { useState, useEffect } from 'react'
import { BarChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
const StackedChart = () => {
    const [data_bar, setDataBar] = useState([])

    const colors = ['orange', '#4ABFF4', '#28B2B3'];

    const dateFrom5 = moment().subtract(5, 'days').format('YYYY-MM-DD');
    const dateFrom30 = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const dateTo = moment().format('YYYY-MM-DD');


    const dataFiveDay = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/consume`, {
                params: {
                    date_from: dateFrom5,
                    date_to: dateTo,
                },
                headers: headers
            });

            if (response.status === 200) {
                setDataBar(response.data)
            } else {
                console.error('No record found or other error');
            }
        } catch (error) {

        }
    };


    useEffect(() => {
        dataFiveDay();
    }, []);
    const stackData = data_bar.map(item => ({
        stacks: [

            { value: item.Carbohydrate * 4 || 0, color: colors[2], borderRadius: 15 },
            { value: item.Fat * 9 || 0, color: colors[1], borderRadius: 15, marginBottom: 5 },
            { value: item.Protein * 4 || 0, color: colors[0], borderRadius: 15, marginBottom: 5 },

        ],
        label: item.Date.substring(8, 10)
    }));
    const legendData = [
        { color: 'orange', label: 'Protein' },
        { color: '#4ABFF4', label: 'Fat' },
        { color: '#28B2B3', label: 'Carbohydrate' }
    ];

    return (
        <View>
            <Text style={styles.title}>Calories Consumed (kcals)</Text>
            <BarChart
                width={260}
                height={200}

                noOfSections={4}
                stackData={stackData}
                barWidth={10}
                spacing={40}
            />
            <View style={styles.legendContainer}>
                {legendData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                        <Text style={styles.legendLabel}>{item.label}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.daterange}>
                <Text style={styles.datetext}>From  {dateFrom5}   -   To  {dateTo}</Text>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',


    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    colorBox: {
        width: 20,
        height: 5,
        marginRight: 15,
    },
    legendLabel: {
        fontSize: 14,
    },
    daterange: {
        marginTop: 10,
    },
    datetext: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#003300'
    }


});

export default StackedChart;