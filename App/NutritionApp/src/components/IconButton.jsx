import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'


const IconButton = ({ icon, routeName, onPress, colorss, sizes }) => {
    const navigation = useNavigation();
    const [color, setColor] = useState(false)
    const onPressHandler = () => {
        onPress();
        // navigation.navigate(routeName);
    };
    return (
        <TouchableOpacity onPress={onPressHandler}>
            <View style={styles.container}>
                <Ionicons name={icon} size={40} color={colorss}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fff', // Màu mặc định
        borderRadius: 30,
        marginBottom: 10,
        marginHorizontal: 10
    },

});

export default IconButton;
