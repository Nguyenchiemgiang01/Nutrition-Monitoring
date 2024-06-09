import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FoodSearchReq } from '../pages/FoodSearch/FoodSearchReq';
const HeaderSearch = ({ onClose, onResults }) => {
    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState();
    const handlechangeSearch = (text) => {
        setSearchText(text);
    }
    const handleSearch = async () => {

        if (searchText) {
            const foodsearch = await FoodSearchReq(searchText);
            if (foodsearch) {
                setResults(foodsearch)
                onResults(foodsearch)
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
    const DATA = [
        {
            id: '1',
            title: 'All',
        },
        {
            id: '2',
            title: 'Favorites',
        },
    ];
    const [selectedItem, setSelectedItem] = useState('1');
    const Item = ({ title, id }) => {
        return (
            <TouchableOpacity
                style={[styles.item, {
                    backgroundColor: selectedItem === id ? '#003319' : '#EBF2F9',
                }]}
                onPress={() => setSelectedItem(id)}
            >
                <Text style={[styles.tabtext, { color: selectedItem === id ? '#fff' : '#000' }]}>{title}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={onClose} style={styles.iconClose}>
                    <Ionicons name="close-outline" size={30} color="#000" />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search all foods..."
                    value={searchText}
                    onChangeText={handlechangeSearch} // Cập nhật searchText khi người dùng gõ
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search-outline" size={20} color="black" />
                </TouchableOpacity>

            </View>

            <View style={styles.bottomheader}>
                <View style={styles.horizontalscroll}>
                    <SafeAreaView style={styles.safecontainer}>
                        <FlatList
                            style={styles.flatlist}
                            data={DATA}
                            renderItem={({ item }) => <Item title={item.title} id={item.id} />}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </SafeAreaView>
                </View>
            </View>
        </View>
    );
};
const customStyles = {
    searchBarContainer: {
        width: 320,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchBarInputContainer: {
        backgroundColor: '#E7EDFF',
        borderRadius: 30,
    },
};


const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingLeft: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',

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
    textInput: {
        width: 250,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ccc',
        height: 40,
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
    item: {
        marginHorizontal: 10,
        paddingVertical: 1,
        borderRadius: 20,
        color: '#fff',
        borderColor: '#000',
        width: 150,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    tabtext: {
        paddingHorizontal: 10,
        fontWeight: 500,
        fontSize: 14,

    },




});

export default HeaderSearch;
