import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MoreItem = ({ icon, optionName }) => {
    const navigation = useNavigation();

    // const handlePress = () => {
    //     navigation.navigate(navigateTo);
    // };

    return (
        <View style={styles.container} >
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={30} color="#000" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.optionText}>{optionName}</Text>
            </View>
            <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward-outline" size={24} color="#000" />
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
        borderBottomColor: '#ccc'
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
        width: 30,
        alignItems: 'center'
    }
});

export default MoreItem;
