import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import DetailMoreItem from '../../components/DetailMoreItem';
import HeaderMoreDetail from '../../components/HeaderMoreDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import ChangeInfoPopup from '../_Common/ChangeInfoPopup';
import GenderPopup from '../_Common/GenderPopup';
import { Picker } from '@react-native-picker/picker';
const Profile = () => {
    const route = useRoute()
    const { userinfo } = route.params;
    const [isPopupAge, setIsPopupAge] = useState(false);
    const [isPopupHeight, setIsPopupHeight] = useState(false);
    const [isPopupWeight, setIsPopupWeight] = useState(false);
    const [isPopupGender, setIsPopupGender] = useState(false);
    const [isPopupDisease, setIsPopupDisease] = useState(false);
    const [Age, setAge] = useState(userinfo.personal_info.age)
    const [Height, setHeight] = useState(userinfo.personal_info.height)
    const [Weight, setWeight] = useState(userinfo.personal_info.weight)
    const [Gender, setGender] = useState(userinfo.personal_info.gender)
    const [Disease, setDisease] = useState(userinfo.personal_info.disease)
    const [calories, setCalories] = useState(userinfo.personal_info.caloriesgoal)

    const diseasesss = [
        "Coeliac disease",
        "Hypothyroidism",
        "Hyperthyroidism",
        "Diabetes insipidus",
        "Frozen Shoulder",
        "Trigger Finger",
        "Haemochromatosis",
        "Acute Pancreatitis",
        "Chronic Pancreatitis",
        "Nausea and vomiting",
        "Migraine",
        "Mononucleosis",
        "Stomach aches",
        "Conjunctivitis",
        "Dry Mouth",
        "Acne",
        "Malnutrition",
        "Diabetes",
        "Kidney Infection",
        "Obstructive Sleep Apnea",
        "Thyroid",
        "Scleroderma",
        "Acromegaly",
        "Phoechromocytoma",
        "Lupus",
        "Cushing Syndrome",
        "Hypertension",
        "Type 2 Diabetes",
        "High blood pressure",
        "Heart Disease",
        "Stroke",
        "Sleep apnea",
        "Metabolic syndrome",
        "Fatty liver disease",
        "Osteoarthritis",
        "Gallbladder diseases",
        "Kidney Diseases",
        "Measles",
        "Mouth Ulcer",
        "Sore Throat",
        "Yellow Fever"
    ];
    const handleSaveAge = (newage) => {
        setAge(newage)
    };
    const handleSaveGender = (newGender) => {
        setGender(newGender)
    };
    const handleSaveHeight = (newHeight) => {
        setHeight(newHeight)
    }
    const handleSaveWeight = (newWeight) => {
        setWeight(newWeight)
    }
    const handleSaveDisease = (newDisease) => {
        setDisease(newDisease)
    }
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
                <HeaderMoreDetail optionName={"Profile"}></HeaderMoreDetail>
            </View>

            <View style={styles.itemcontainer}>
                <TouchableOpacity style={styles.change} onPress={() => setIsPopupAge(true)}>
                    <DetailMoreItem optionName={"Age"} value={Age}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupAge}
                    onClose={() => setIsPopupAge(false)}
                    onSave={handleSaveAge}
                    title="Age"
                    initialValue={Age}
                />

                <TouchableOpacity style={styles.change} onPress={() => setIsPopupHeight(true)}>
                    <DetailMoreItem optionName={"Height"} value={Height + " cm"}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupHeight}
                    onClose={() => setIsPopupHeight(false)}
                    onSave={handleSaveHeight}
                    title="Height"
                    initialValue={Height}
                />
                <TouchableOpacity style={styles.change} onPress={() => setIsPopupWeight(true)}>
                    <DetailMoreItem optionName={"Weight"} value={Weight + " kg"}></DetailMoreItem>
                </TouchableOpacity>
                <ChangeInfoPopup
                    visible={isPopupWeight}
                    onClose={() => setIsPopupWeight(false)}
                    onSave={handleSaveWeight}
                    title="Weight"
                    initialValue={Weight}
                />
                <TouchableOpacity style={styles.change} onPress={() => setIsPopupGender(true)}>
                    <DetailMoreItem optionName={"Gender"} value={Gender}></DetailMoreItem>
                </TouchableOpacity>
                <GenderPopup
                    visible={isPopupGender}
                    onClose={() => setIsPopupGender(false)}
                    onSave={handleSaveGender}
                    title="Gender"
                    initialValue={Gender}
                />

                <View style={styles.disease}>
                    <Text style={styles.textdisease}>Disease</Text>
                    <Picker style={styles.picker}
                        selectedValue={Disease}
                        onValueChange={(itemValue) => setDisease(itemValue)}
                    >
                        <Picker.Item key={-1} label="No disease" value="" />
                        {diseasesss.map((disease, index) => (
                            <Picker.Item key={index} label={disease} value={disease} />
                        ))}
                    </Picker>
                </View>
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
    },
    disease: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingLeft: 30

    },
    picker: {
        width: 180,
        fontSize: 18,
        color: '#00994C'
    },
    textdisease: {
        fontSize: 18,
        fontWeight: 'bold'
    }


});

export default Profile;
