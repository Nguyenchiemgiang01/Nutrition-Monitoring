import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.progressBar, { width: `${percentage}%` }]}>
                <Text style={styles.percentageText}>{percentage}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 15,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#003366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
});

export default ProgressBar;
