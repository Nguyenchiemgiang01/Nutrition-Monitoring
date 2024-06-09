import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const ChangePasswordPopup = ({ visible, onClose, onSave, title, initialValue }) => {
    const [currentPassword, setcurentPassword] = useState();
    const [newPassword, setnewPassword] = useState();
    const [confirmnewPassword, setconfirmnewPassword] = useState();

    const handleSave = () => {
        if (currentPassword == initialValue) {
            if (newPassword == confirmnewPassword) {
                onSave(newPassword);
                onClose();
            }
            else {
                Alert.alert(" Confirm password not exactly!")
                onClose();
            }
        }
        else {
            Alert.alert(" Current password not exactly!")
            onClose();
        }


    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setcurentPassword}
                        placeholder='Current Password'
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setnewPassword}
                        placeholder='New Password'
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={confirmnewPassword}
                        onChangeText={setconfirmnewPassword}
                        placeholder='Confirm New Password'
                        keyboardType="numeric"
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#009999',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
});

export default ChangePasswordPopup;
