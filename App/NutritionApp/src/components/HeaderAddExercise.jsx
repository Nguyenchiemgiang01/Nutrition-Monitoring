import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AddExerciseReq } from '../pages/AddExercise/AddExerciseReq';
const HeaderAddExercise = ({ onClose, onResults }) => {
    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState([]);
    const handleSearch = async () => {
        if (searchText) {
            console.log(searchText)
            const result = await AddExerciseReq(searchText);
            console.log("11: ", result)
            if (result) {
                onResults(result)

            }
            else {
                setResults([])
                onResults(results)
            }

        } else {
            setResults([]);
            onResults(results)

        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>

                <TouchableOpacity onPress={onClose} style={styles.iconClose}>
                    <Ionicons name="close-outline" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.textheader}>Add Exercise</Text>
            </View>
            <View style={styles.bottomHeader}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search all exercises..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search-outline" size={20} color="black" />
                </TouchableOpacity>

            </View>


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
        paddingLeft: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },

    iconClose: {
        marginRight: 10
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        height: 40,
    },
    bottomHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        width: 340,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ccc',
        height: 50,
        marginLeft: 20,
        padding: 10
    },
    horizontalscroll: {
        width: '96%',
        paddingBottom: 10

    },
    flatlist: {
        backgroundColor: '#E7EDFF',
        paddingVertical: 5,
        borderRadius: 15
    },

    safecontainer: {
        backgroundColor: '#EBF2F9',
        borderRadius: 15,

    },
    textheader: {
        fontSize: 24,
        marginLeft: 80,
        fontWeight: 'bold'
    }




});

export default HeaderAddExercise;
