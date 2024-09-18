import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Grid, Text } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';

const LineChartWithGradient = ({ data, spacing = 10 }) => {

    const [data_line, setDataLine] = useState([])
    const dateFrom30 = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const dateTo = moment().format('YYYY-MM-DD');
    const dataMonth = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/consume`, {
                params: {
                    date_from: dateFrom30,
                    date_to: dateTo,
                },
                headers: headers
            });

            if (response.status === 200) {
                setDataLine(response.data)
            } else {
                console.error('No record found or other error');
            }
        } catch (error) {

        }
    };
    useEffect(() => {
        dataMonth();
    }, [dateTo]);

    const lineData = data_line.map((item, index) => (
        { value: item.Calories || 0, label: (index === 0 || index === 7 || index === 14 || index === 21 || index === 29) ? item.Date.substring(8, 10) : '' }
    ));
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calories  (kcals)</Text>
            <LineChart
                data={lineData}
                spacing={30}
                barWidth={10}
                hideDataPoints
                lineGradient
                lineGradientId="ggrd"
                lineGradientComponent={() => {
                    return (
                        <LinearGradient id="ggrd" x1="0" y1="0" x2={'0'} y2={'1'}>
                            <Stop offset="0" stopColor={'blue'} />
                            <Stop offset="0.5" stopColor={'orange'} />
                            <Stop offset="1" stopColor={'green'} />
                        </LinearGradient>
                    );
                }}
            />
            <Text style={styles.xAxisLabel}>Day</Text>
            <View style={styles.daterange}>
                <Text style={styles.datetext}>From  {dateFrom30}   -   To  {dateTo}</Text>
            </View>
        </View>)
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    daterange: {
        marginTop: 10,
    },
    datetext: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#003300'
    },
    xAxisLabel: {
        position: 'absolute',
        marginLeft: 306,
        marginTop: 280,
        fontSize: 16,
        color: '#808080',
    }

});

export default LineChartWithGradient;
