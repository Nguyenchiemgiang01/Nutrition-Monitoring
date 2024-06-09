import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import style from '../ChartScreen/ChartStyle';
import StackedChart from '../../components/Chart/StackedChart';
import LineChartWithGradient from '../../components/Chart/LineChartWithGradient';
export default function ChartScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.maincontainer}>
                <ScrollView>
                    <SafeAreaView style={styles.chart}>
                        <StackedChart></StackedChart>
                    </SafeAreaView>

                    <SafeAreaView style={styles.chart}>
                        <LineChartWithGradient></LineChartWithGradient>
                    </SafeAreaView>


                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create(style);
