import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

const HeaderMoreDetail = ({ optionName }) => {
    const navigation = useNavigation()
    const onBack = () => {
        navigation.navigate('More')
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <Ionicons name="chevron-back-outline" size={26} color="#000" style={styles.iconback} >

                </Ionicons>
                <Text style={styles.more}>More</Text>

            </TouchableOpacity>
            <Text style={styles.nameoption}>{optionName}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff'

    },
    iconButton: {
        flexDirection: 'row',
    },
    iconback: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#009999',
    },
    more: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#009999',

    },
    nameoption: {
        marginLeft: 70,
        fontSize: 24,
        fontWeight: 'bold'
    }

});

export default HeaderMoreDetail;
