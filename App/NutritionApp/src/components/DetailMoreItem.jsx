import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailMoreItem = ({ optionName, value }) => {
    return (
        <View style={styles.container} >

            <View style={styles.textContainer}>
                <Text style={styles.optionText}>{optionName}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <Text style={styles.info}>{value}</Text>
                <Ionicons name="chevron-forward-outline" size={22} color="#ccc" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 1,
        backgroundColor: '#fff'
    },
    iconContainer: {
        width: 30,
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        marginLeft: 10
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrowContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    info: {
        fontSize: 20,
        color: '#00994C',
        marginRight: 10
    }
});

export default DetailMoreItem;
