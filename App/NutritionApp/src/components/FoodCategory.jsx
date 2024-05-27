import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FoodItem from './FoodItem';
import { useNavigation } from '@react-navigation/native';
const FoodCategory = ({ categoryName, items, date }) => {

    const [expanded, setExpanded] = useState(false);

    const status = 1
    const navigation = useNavigation()
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const handleadd = () => {
        // setModalVisible(true);
        navigation.navigate('FoodSearch', { date })

    }


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftcateg}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleadd}>
                        <Ionicons name="add-outline" size={30} color="#009999" />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>{categoryName}</Text>
                </View>
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleAddFood}>
                                        <Ionicons name="logo-apple" size={30} color={'#FF3333'}></Ionicons>
                                        <Text style={styles.modalButtonText}>Add Food</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleAddExercise}>
                                        <Ionicons name="accessibility" size={30} color={'#00CCCC'}></Ionicons>
                                        <Text style={styles.modalButtonText}>Add Exercise</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal> */}
                <TouchableOpacity onPress={toggleExpand} style={styles.iconButton}>
                    <Ionicons name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={24} color="#000" />
                </TouchableOpacity>
            </View>
            {expanded && (
                <View style={styles.itemsContainer}>
                    {items.map((item, index) => (
                        <View key={index}>
                            <FoodItem items={item} status={status} />
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftcateg: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20
    },
    iconButton: {
        padding: 5,

    },
    itemsContainer: {
        marginTop: 10,
    },
    itemText: {
        fontSize: 16,
        paddingVertical: 2,
    },

});

export default FoodCategory;
