import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
const GenderPopup = ({ visible, onClose, onSave, title, initialValue }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleSave = () => {
        onSave(inputValue);
        onClose();
    };
    const options = [
        { key: 1, label: 'Male', value: 'Male' },
        { key: 2, label: 'Female', value: 'Female' },
        { key: 3, label: 'Other', value: 'Other' },
    ];

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
                    <View style={styles.pickerContainer}>
                        <ModalSelector
                            data={options}
                            initValue={inputValue}
                            onChange={(option) => setInputValue(option.value)}
                            style={styles.selector}
                        >
                            <View style={styles.selectedValueContainer}>
                                <Text style={styles.selectedValueText}>{inputValue}</Text>
                            </View>
                        </ModalSelector>
                    </View>
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
    selector: {
        width: 200,
    },
    selectedValueContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedValueText: {
        fontSize: 16,
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
    pickerContainer: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10

    },
});

export default GenderPopup;
