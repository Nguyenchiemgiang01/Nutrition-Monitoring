import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const Summary = ({ protein, netCarbs, fat }) => {
    const totalCalories = ((protein * 4) + (netCarbs * 4) + (fat * 9)).toFixed(1);
    const total = protein + netCarbs + fat;
    const proteinPercentage = (protein / total) * 100;
    const netCarbsPercentage = (netCarbs / total) * 100;
    const fatPercentage = (fat / total) * 100;

    const circleRadius = 50;
    const circleCircumference = 2 * Math.PI * circleRadius;

    const calculateOffset = (percentage) => {
        return circleCircumference - (percentage / 100) * circleCircumference;
    };

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <Svg height="120" width="120" viewBox="0 0 120 120">
                    <G rotation="-90" origin="60, 60">
                        <Circle
                            cx="60"
                            cy="60"
                            r={circleRadius}
                            stroke="#e0e0e0"
                            strokeWidth="10"
                            fill="none"
                        />
                        <Circle
                            cx="60"
                            cy="60"
                            r={circleRadius}
                            stroke="#EA3B04"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={circleCircumference}
                            strokeDashoffset={calculateOffset(proteinPercentage + netCarbsPercentage + fatPercentage)}
                        />

                        <Circle
                            cx="60"
                            cy="60"
                            r={circleRadius}
                            stroke="#1CCAD7"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={circleCircumference}
                            strokeDashoffset={calculateOffset(proteinPercentage + netCarbsPercentage)}
                        />
                        <Circle
                            cx="60"
                            cy="60"
                            r={circleRadius}
                            stroke="#AE61C2"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={circleCircumference}
                            strokeDashoffset={calculateOffset(proteinPercentage)}
                        />

                    </G>
                </Svg>
                <Text style={styles.caloriesText}>{totalCalories} kcal</Text>
            </View>
            <View style={styles.valuesContainer}>
                <Text style={[styles.valueText, { color: '#AE61C2' }]}>Protein: {protein}g</Text>
                <Text style={[styles.valueText, { color: '#1CCAD7' }]}>Net Carbs: {netCarbs}g</Text>
                <Text style={[styles.valueText, { color: '#EA3B04' }]}>Fat: {fat}g</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        flex: 0.4,
    },
    caloriesText: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -10 }],
    },
    valuesContainer: {
        flex: 0.6,
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Summary;
