import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import config from '../../../config';
import { useNavigation } from '@react-navigation/native';
const EnterOTP = ({ isVisible, onClose, email }) => {
    const [otp, setOTP] = useState('');
    const [emails, setEmail] = useState(email);
    const [error, setError] = useState();
    const navigation = useNavigation()

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(config.BASE_URL + '/validate-otp', {
                "otp": otp,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'enter your new password');
                navigation.navigate("EnterPasswordReset", { emails })
            } else {
                Alert.alert('Error', 'Failed to send password reset email');
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'Failed to send password reset email');
        }
        setError('')
        onClose();
    };
    const onCloses = () => {
        setError('')
        onClose();

    }



    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>OTP reset password!</Text>
                <View style={styles.description}>
                    <Text style={styles.textdes}>Fill in the OTP code sent to your email! </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="OTP reset password! "
                    value={otp}
                    onChangeText={setOTP}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onCloses} style={styles.btn}><Text style={styles.textbtn}>CANCEL</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleResetPassword} style={styles.btn} ><Text style={styles.textbtn}>SEND</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    btn: {
        alignItems: "center",
        padding: 10,
    },
    textbtn: {
        color: "#006666",
        fontSize: 20,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    description: { width: "100%" },
    textdes: {
        fontSize: 18,
        marginBottom: 15,
        color: "#404040"
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 20,
        height: 60,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default EnterOTP