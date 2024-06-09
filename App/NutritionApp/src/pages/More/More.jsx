
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderMore from '../../components/HeaderMore';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import MoreItem from '../../components/MoreItem';

const More = () => {
    const navigation = useNavigation()
    const [userinfo, setUserInfo] = useState()
    const getMail = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/user/profile`, {
                headers: headers
            });

            if (response.status === 200) {
                console.log("data:", response.data)
                setUserInfo(response.data)
            } else {
                console.error('No record found or other error');
            }
        } catch (error) {
            console.error('Error fetching consume data:', error);
        }
    }
    useEffect(() => {
        getMail();
    }, []);
    const handleLogout = async () => {
        try {

            const response = await axios.post(`${config.BASE_URL}/logout`);
            if (response.status === 200) {
                Alert.alert('Success', 'Logged out successfully');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to log out');
        }
    };
    const handleAccount = () => {
        navigation.navigate('Account', { userinfo })
    }
    const handleProfile = () => {
        navigation.navigate('Profile', { userinfo })
    }
    const handleTarget = () => {
        navigation.navigate('Target', { userinfo })
    }
    return (
        <View style={styles.container}>
            <HeaderMore userinfor={userinfo}></HeaderMore>
            <View style={styles.itemcontainer}>
                <TouchableOpacity onPress={handleAccount}>
                    <MoreItem style={styles.item} icon={"help-buoy-outline"} optionName={"Account"}></MoreItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleProfile}>
                    <MoreItem style={styles.item} icon={"person-circle-outline"} optionName={"Profile"}></MoreItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTarget}>
                    <MoreItem style={styles.item} icon={"golf-outline"} optionName={"Targets"}></MoreItem>
                </TouchableOpacity>
                <MoreItem style={styles.item} icon={"ellipsis-horizontal-circle-outline"} optionName={"About"}></MoreItem>
                <TouchableOpacity onPress={handleLogout}>
                    <MoreItem style={styles.item} icon={"arrow-redo-outline"} optionName={"Logout"} ></MoreItem>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',


    },
    itemcontainer: {
        marginBottom: 5,
        backgroundColor: '#fff',
        marginTop: 20,

    },
    item: {
        marginBottom: 0,
    }

});

export default More;
