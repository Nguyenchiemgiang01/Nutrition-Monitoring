import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { signUp } from '../Signup/SignupReq';
const PersonalInfo = ({ navigation }) => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [disease, setDisease] = useState('');

    const [errors, setErrors] = useState({});
    const route = useRoute();
    const { userData } = route.params;
    const email = userData.email;
    const username = userData.username;
    const fullname = userData.fullname;
    const password = userData.password

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
    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!age) {
            errors.age = 'Age is required';
            valid = false;
        }
        if (!height) {
            errors.height = 'Height is required';
            valid = false;
        }
        if (!weight) {
            errors.weight = 'Weight is required';
            valid = false;
        }
        if (!gender) {
            errors.gender = 'Gender is required';
            valid = false;
        }
        if (!disease) {
            errors.disease = 'Disease is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const data = {
            email,
            username,
            fullname,
            password,
            age,
            height,
            weight,
            gender,
            disease

        };

        try {
            const response = await signUp(data);
            if (response) {
                Alert.alert('Success', 'Personal information updated successfully');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Error updating personal information:', error);
            Alert.alert('Error', 'Failed to update personal information');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.toppage}>
                <Text style={styles.textinfo}>
                    Add your's personal information !
                </Text>
            </View>
            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}

            <Text style={styles.label}>Height</Text>
            <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="...cm"
            />
            {errors.height && <Text style={styles.error}>{errors.height}</Text>}

            <Text style={styles.label}>Weight</Text>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="...kg"
            />
            {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >

                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <Text style={styles.label}>Disease</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={disease}
                    onValueChange={(itemValue) => setDisease(itemValue)}
                >
                    <Picker.Item key={-1} label="No disease" value="" />
                    {diseasesss.map((disease, index) => (
                        <Picker.Item key={index} label={disease} value={disease} />
                    ))}
                </Picker>
            </View>
            {errors.disease && <Text style={styles.error}>{errors.disease}</Text>}

            <View style={styles.btn} >
                <TouchableOpacity onPress={handleSubmit} style={styles.submit} ><Text style={styles.textsubmit}>Add information</Text></TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10
    },
    pickerContainer: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10

    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    toppage: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40

    },
    textinfo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#009999'
    },
    btn: {
        width: 200,
        color: '#ccc',
        marginTop: 20,
        marginLeft: 120,
        alignItems: 'center'
    },

    submit: {
        color: '#fff',
        backgroundColor: '#009999',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    textsubmit: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default PersonalInfo;
