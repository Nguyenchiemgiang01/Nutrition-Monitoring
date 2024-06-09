import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import DetailMoreItem from '../../components/DetailMoreItem';
import HeaderMoreDetail from '../../components/HeaderMoreDetail';
import ChangeInfoPopup from '../_Common/ChangeInfoPopup';
import ChangePasswordPopup from '../_Common/ChangePasswordPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
const Account = () => {
    const route = useRoute()
    const { userinfo } = route.params;
    const [isPopupUsername, setIsPopupUsername] = useState(false);
    const [isPopupFullName, setIsPopupFullName] = useState(false);
    const [isPopupEmail, setIsPopupEmail] = useState(false);
    const [isPopupPassword, setIsPopupPassword] = useState(false);
    const [username, setUserName] = useState(userinfo.username)
    const [fullname, setFullName] = useState(userinfo.fullname)
    const [email, setEmail] = useState(userinfo.email)
    const [password, setPassword] = useState(userinfo.password)
    const handleSaveUsername = (newUsername) => {
        setUserName(newUsername)
    };
    const handleSavePassword = (newPassword) => {
        setPassword(newPassword)
    };
    const handleSaveFullname = (newFullname) => {
        setFullName(newFullname)
    }
    const handleSaveEmail = (newEmail) => {
        setEmail(newEmail)
    }
    const profileData = {
        Username: username,
        Password: password,
        Email: email,
        Name: fullname,
    };
    const handleUpdate = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access_token');

            const response = await axios.post(`${config.BASE_URL}/user/profile/update`, profileData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Profile updated successfully');
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderMoreDetail optionName={"Account"}></HeaderMoreDetail>
            </View>

            <View style={styles.itemcontainer}>

                <TouchableOpacity style={styles.change} onPress={() => setIsPopupUsername(true)}>
                    <DetailMoreItem optionName={"User name"} value={username}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupUsername}
                    onClose={() => setIsPopupUsername(false)}
                    onSave={handleSaveUsername}
                    title="User Name"
                    initialValue={username}
                />

                <TouchableOpacity style={styles.change} onPress={() => setIsPopupFullName(true)}>
                    <DetailMoreItem optionName={"Full name"} value={fullname}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupFullName}
                    onClose={() => setIsPopupFullName(false)}
                    onSave={handleSaveFullname}
                    title="Full Name"
                    initialValue={fullname}
                />

                <TouchableOpacity style={styles.change} onPress={() => setIsPopupEmail(true)}>
                    <DetailMoreItem optionName={"Email"} value={email}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupEmail}
                    onClose={() => setIsPopupEmail(false)}
                    onSave={handleSaveEmail}
                    title="Email"
                    initialValue={email}
                />

                <TouchableOpacity style={styles.change} onPress={() => setIsPopupPassword(true)}>
                    <DetailMoreItem optionName={"Change Password"} value={""}></DetailMoreItem>
                </TouchableOpacity>
                <ChangePasswordPopup
                    visible={isPopupPassword}
                    onClose={() => setIsPopupPassword(false)}
                    onSave={handleSavePassword}
                    title="Change Password"
                    initialValue={password}
                />
            </View>

            <TouchableOpacity style={styles.btnupdate} onPress={handleUpdate}>
                <Text style={styles.textbtn}>Update change</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
    },
    itemcontainer: {
        marginTop: 20
    },
    btnupdate: {
        padding: 30,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    textbtn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        backgroundColor: '#006666',
        borderRadius: 10,
        fontStyle: 'italic'
    }

});

export default Account;
