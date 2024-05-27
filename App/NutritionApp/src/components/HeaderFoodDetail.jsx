import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HeaderFoodDetail = ({ foodName, onClose }) => {
    const [islike, setIsLike] = useState(false)

    const toggleislike = () => {
        setIsLike(!islike)
    }
    const iconName = islike ? 'star' : 'star-outline';
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                <Ionicons name="close-outline" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.foodName}>{foodName}</Text>
            <View style={styles.iscomplete}>
                <TouchableOpacity onPress={toggleislike}>
                    <Ionicons name={iconName} style={styles.iconislike}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconButton: {
        padding: 5,
    },
    foodName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconislike: {
        fontSize: 25,
        color: '#FF8000',
    }
});

export default HeaderFoodDetail;
