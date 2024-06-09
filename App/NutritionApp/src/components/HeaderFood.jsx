import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const HeaderFood = () => {
    const navigation = useNavigation()
    const selectedDate = moment().format('YYYY-MM-DD')
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <Text style={styles.title}>
                    <Ionicons name='leaf' size={28} style={styles.lefticon}></Ionicons>
                    Foods
                </Text>
                <TouchableOpacity style={styles.search} onPress={() => navigation.navigate("FoodSearch", { selectedDate })}>
                    <Ionicons name='search-outline' size={28} style={styles.searchicon}></Ionicons>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexDirection: 'column',

    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 20,
        alignItems: 'center'

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#006666',
        alignItems: 'center'


    },
    lefticon: {

    },
    searchicon: {
        color: '#006666',
    }





});

export default HeaderFood;
