import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MealItem = ({ items }) => {
    const navigation = useNavigation()
    const godetail = () => {
        navigation.navigate("MealDetail", { items })
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.MealItem} onPress={godetail}>
                <View style={styles.item}>
                    <Text style={styles.name} >{items.Name}</Text>
                    <View style={styles.createat}>
                        <Text style={styles.calories}>CreateAt: </Text>
                        <Text style={styles.calories}>{items.CreateAt} </Text>
                    </View>

                </View>
            </TouchableOpacity>

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between'

    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        width: 200,
        fontSize: 16,
        marginTop: 10,
        alignItems: 'center',
        fontWeight: 'bold'

    },
    calories: {
        fontSize: 16,
        color: '#888',
    },
});

export default MealItem;
