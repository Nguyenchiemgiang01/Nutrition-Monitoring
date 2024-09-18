import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import config from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faEyeSlash, faEye, faUser, faSignature, faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';
const EnterPasswordReset = (emails) => {
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);
    const [confirmpassword, setconfirmPassword] = useState('');
    const [confirmpasswordError, setconfirmPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation()

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowconfirmPassword = () => {
        setShowconfirmPassword(!showconfirmPassword);
    };


    const handleResetPassword = async () => {
        if (confirmpassword != password) {
            setconfirmPasswordError("password confirm is not match");
            return;
        } else {
            setconfirmPasswordError('');
        }
        try {
            const response = await axios.post(config.BASE_URL + '/reset-new-password', {
                "email": emails.route.params.emails,
                "password": password
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Reset password successfully');
                navigation.navigate('Login')

            } else {
                Alert.alert('Error', 'Failed to send password reset email');
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'Failed to send password reset email');
        }
        setError('')

    };
    const onCloses = () => {
        navigation.navigate('Login')

    }

    return (
        <View style={styles.modalContent}>
            <Text style={styles.title}>Enter your new password!</Text>
            <View style={styles.inputsignup}>
                <Text style={styles.text}>Password</Text>
                <View style={styles.groupinput}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} size={30} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        keyboardType="numeric"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}

                    />
                    <TouchableOpacity style={styles.iconShowPassword} onPress={toggleShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={styles.icon} size={25} />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.error}><Text style={styles.errorText} >{passwordError}</Text> </Text> : null}
            </View>
            <View style={styles.inputsignup}>
                <Text style={styles.text}>Confirm Password</Text>
                <View style={styles.groupinput}>
                    <FontAwesomeIcon icon={faLock} style={styles.icon} size={30} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        keyboardType="numeric"
                        secureTextEntry={!showconfirmPassword}
                        value={confirmpassword}
                        onChangeText={(text) => setconfirmPassword(text)}

                    />
                    <TouchableOpacity style={styles.iconShowPassword} onPress={toggleShowconfirmPassword}>
                        <FontAwesomeIcon icon={showconfirmPassword ? faEye : faEyeSlash} style={styles.icon} size={25} />
                    </TouchableOpacity>
                </View>
                {confirmpasswordError ? <Text style={styles.error}><Text style={styles.errorText} >{confirmpasswordError}</Text> </Text> : null}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onCloses} style={styles.btn}><Text style={styles.textbtn}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleResetPassword} style={styles.btn} ><Text style={styles.textbtn}>Update</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: 10
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
    text: {
        fontSize: 20,
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#006666'
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
    iconShowPassword: {
        position: "absolute",
        right: "10%",
        zIndex: 1,
        top: "70%",
        transform: [{ translateY: -12 }],
        color: "#8DA9D2",
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    inputsignup: {
        flexDirection: "column",
        width: "94%",
        alignItems: "flex-start",
        height: 80,
        marginTop: 20,
    },
    groupinput: {
        width: "100%",
        shadowColor: "#000",
        elevation: 6,
        height: 60,
    },

    icon: {
        position: "absolute",
        left: "3%",
        zIndex: 1,
        top: "45%",
        transform: [{ translateY: -12 }],
        color: "#8DA9D2",
    },
    input: {
        width: "100%",
        backgroundColor: "#FCFFFF",
        height: 60,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingLeft: 60,
        fontSize: 20,
        flex: 1,
    },
});

export default EnterPasswordReset;