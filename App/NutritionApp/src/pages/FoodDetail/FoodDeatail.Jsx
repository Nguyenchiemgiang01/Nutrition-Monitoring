import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderFoodDetail from '../../components/HeaderDiary';

export default function FoodDetail() {

    const onClose = () => {
        console.log('close')
    }
    const foodName = 'Chicken'
    return (
        <View style={styles.container}>
            <HeaderFoodDetail foodName={foodName} onClose={onClose}></HeaderFoodDetail>
            <View style={styles.content} FoodDetail></View>
        </View>


    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        maincontent: {

            backgroundColor: '#fff'
        },
        dashboard: {

            backgroundColor: '#FF99CC',

        },
        content: {
            flex: 1,
            backgroundColor: '#ccc'
        }
    }
)
