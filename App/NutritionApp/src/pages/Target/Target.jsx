import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import DetailMoreItem from '../../components/DetailMoreItem';
import HeaderMoreDetail from '../../components/HeaderMoreDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import ChangeInfoPopup from '../_Common/ChangeInfoPopup'

const Target = () => {
    const route = useRoute()
    const { userinfo } = route.params;
    const [calories, setCalories] = useState(userinfo.personal_info.caloriesgoal)
    const [isPopupTarget, setIsPopupTarget] = useState(false);
    const [Age, setAge] = useState(userinfo.personal_info.age)
    const [Height, setHeight] = useState(userinfo.personal_info.height)
    const [Weight, setWeight] = useState(userinfo.personal_info.weight)
    const [Gender, setGender] = useState(userinfo.personal_info.gender)
    const [Disease, setDisease] = useState(userinfo.personal_info.disease)

    const handleSaveCaloriesTarget = (newcalories) => {
        setCalories(newcalories)
    };
    const personalData = {
        Age: Age,
        Height: Height,
        Weight: Weight,
        Gender: Gender,
        Disease: Disease,
        CaloriesGoal: calories,
    };
    const handleUpdate = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access_token');
            const response = await axios.post(`${config.BASE_URL}/user/persional/update`, personalData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Personal Information updated successfully');
            } else {
                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating Personal Information:', error);
            Alert.alert('Error', 'Failed to update Personal Information');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderMoreDetail optionName={"Target"}></HeaderMoreDetail>
            </View>

            <View style={styles.itemcontainer}>
                <TouchableOpacity style={styles.change} onPress={() => setIsPopupTarget(true)}>
                    <DetailMoreItem optionName={"calories"} value={calories}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupTarget}
                    onClose={() => setIsPopupTarget(false)}
                    onSave={handleSaveCaloriesTarget}
                    title="calories"
                    initialValue={calories}
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

export default Target;
