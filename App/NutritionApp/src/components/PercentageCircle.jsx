import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import { CircularProgress } from 'react-native-svg-circular-progress';

const PercentageCircle = ({ percentage, remainning }) => {
    const radius = 60;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
                <G rotation="-90" origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}>
                    <Circle
                        stroke="#e6e6e6"
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
                        stroke="#3498db"
                        cx={radius + strokeWidth / 2}
                        cy={radius + strokeWidth / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={`${progress}, ${circumference}`}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <View style={styles.textContainer}>
                <Text style={styles.percentageText}>{`${remainning}`}</Text>
                <Text style={styles.goalText}>Remainning</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
    },
    goalText: {
        fontSize: 14,
        color: '#3498db',
    },
});

export default PercentageCircle;
