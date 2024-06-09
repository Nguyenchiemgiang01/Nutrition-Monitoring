import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

const HeaderMore = ({ userinfor }) => {

    return (
        <View style={styles.container}>
            {userinfor && (
                <View style={styles.topHeader}>
                    <Text style={styles.username}>{userinfor.username}</Text>
                    <Text style={styles.email}>{userinfor.email}</Text>
                </View>
            )}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
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
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
        height: 40,
        marginLeft: 20

    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#009999',


    },
    email: {
        fontSize: 18,
        fontStyle: 'italic'
    }




});

export default HeaderMore;
