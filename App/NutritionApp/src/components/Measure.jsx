import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Measure = ({ name, value, unit }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6CB745',
    },
    unit: {
        fontSize: 20,
        color: '#888',
    },
});

export default Measure;
