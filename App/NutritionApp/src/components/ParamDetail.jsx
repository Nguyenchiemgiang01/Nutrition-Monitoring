import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';



const ParamDetail = ({ data }) => {
    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={[styles.row, index % 2 === 0 ? styles.rowOdd : styles.rowEven]}>
                <Text style={styles.text}>{item.key}</Text>
                <Text style={styles.text}>{item.value}</Text>
            </View>
        );
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Detail</Text>
            {data.map((item, index) => renderItem({ item, index }))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D3D3D3',
        padding: 8,
        borderRadius: 8,
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,

    },
    text: {
        fontSize: 16,
        color: '#333333',
    },
    rowEven: {
        backgroundColor: '#F0F0F0',
    },
    rowOdd: {
        backgroundColor: '#FFFFFF',
    },
});

export default ParamDetail;
