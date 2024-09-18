import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import config from '../../../config';
import EnterOTP from './EnterOTP';

const ResetPasswordPopup = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState();
    const [showOTPPopup, setShowOTPPopup] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const generateOtp = async () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email addres');
            return;
        }
        try {
            const response = await axios.post(config.BASE_URL + '/generate-otp', {
                email: email,
            });
            // setOtp(response.data.otp);
            if (response) {
                Alert.alert('OTP has been sent to your email');
                setShowOTPPopup(true);

            }

        } catch (error) {
            Alert.alert('Error', 'Email not exist');
        }
    };

    // const handleResetPassword = async () => {
    //     if (!validateEmail(email)) {
    //         setError('Please enter a valid email addres');
    //         return;
    //     }
    //     try {
    //         const response = await axios.post(config.BASE_URL + '/send-email', {
    //             email: email,
    //         });

    //         if (response.status === 200) {
    //             Alert.alert('Success', 'Password reset email sent successfully');
    //             onClose();
    //         } else {
    //             Alert.alert('Error', 'Failed to send password reset email');
    //         }
    //     } catch (error) {
    //         console.error('Error sending password reset email:', error);
    //         Alert.alert('Error', 'Failed to send password reset email');
    //     }
    //     setError('')
    //     onClose();
    // };
    const onCloses = () => {
        setError('')
        onClose();

    }



    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Reset Password?</Text>
                <View style={styles.description}>
                    <Text style={styles.textdes}>Enter the email associated with your account : </Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onCloses} style={styles.btn}><Text style={styles.textbtn}>CANCEL</Text></TouchableOpacity>
                    <TouchableOpacity onPress={generateOtp} style={styles.btn} ><Text style={styles.textbtn}>GET OTP</Text></TouchableOpacity>
                </View>
            </View>
            {showOTPPopup && (
                <EnterOTP
                    isVisible={showOTPPopup}
                    onClose={() => setShowOTPPopup(false)}
                    email={email}
                />
            )}
        </Modal>
    );
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

export default ResetPasswordPopup;
