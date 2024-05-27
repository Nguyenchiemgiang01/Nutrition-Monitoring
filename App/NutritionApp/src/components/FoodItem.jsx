import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FoodItem = ({ items, status }) => {
    const navigation = useNavigation()

    const navtodetail = (food) => {

        navigation.navigate('FoodDetail', { food, status })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fooditem} onPress={() => navtodetail(items)}>
                <View style={styles.item}>
                    <Text style={styles.name} >{items.name}</Text>
                    <Text style={styles.calories}>{items.calories} kcal</Text>
                </View>
            </TouchableOpacity>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {

        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        alignItems: 'center',


    },
    calories: {
        fontSize: 16,
        color: '#888',
    },
});

export default FoodItem;
