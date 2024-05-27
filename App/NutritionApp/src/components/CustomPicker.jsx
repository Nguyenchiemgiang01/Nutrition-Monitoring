import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomPicker = ({ options, selectedValue, onValueChange }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionPress = (value) => {
        onValueChange(value);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
                <Text style={styles.pickerButtonText}>{selectedValue ? selectedValue : 'Select a meal'}</Text>
                <Ionicons name='chevron-down-outline' style={styles.iconselect}></Ionicons>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleOptionPress(item.value)} style={styles.optionButton}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerButton: {

        borderColor: 'gray',
        padding: 10,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerButtonText: {
        fontSize: 18,
        color: '#808080'
    },
    iconselect: {
        marginLeft: 10,
        fontSize: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        padding: 20,
    },
    optionButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    optionText: {
        fontSize: 20,
        // fontStyle: 'italic',
        color: '#336600',
        marginLeft: 10
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        alignItems: 'flex-end',
    },
    closeButtonText: {
        fontSize: 20,
        color: '#006666',

    },
});

export default CustomPicker;
