import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from './IconButton';
import { useNavigation } from '@react-navigation/native';
export default function Footer() {
    const [selectedButton, setSelectedButton] = useState('home');
    const navigation = useNavigation()
    const handleButtonPress = (buttonName, routeName) => {

        setSelectedButton(buttonName);
        if (routeName) {
            navigation.navigate(routeName)
        }

    };
    return (
        <View style={styles.container}>
            <IconButton icon='home'
                onPress={() => handleButtonPress('home', 'Home')}
                colorss={selectedButton === 'home' ? '#6CB745' : '#808080'}
            />
            <IconButton icon='newspaper-outline'
                onPress={() => handleButtonPress('diary', 'Diary')}
                colorss={selectedButton === 'diary' ? '#6CB745' : '#808080'}

            />
            <TouchableOpacity >
                <View >
                    <Ionicons name='add-circle' size={75} color='#6CB745'
                    />
                </View>
            </TouchableOpacity>
            <IconButton icon='fast-food' routeName=""
                onPress={() => handleButtonPress('food')}
                colorss={selectedButton === 'food' ? '#6CB745' : '#808080'}
            />
            <IconButton icon='ellipsis-horizontal-circle' routeName=""
                onPress={() => handleButtonPress('more')}
                colorss={selectedButton === 'more' ? '#6CB745' : '#808080'}
            />
        </View>


    )
}
const styles = StyleSheet.create({
    container: {

        height: 80,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,

    },
    iconbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#9999FF',
    },



})
