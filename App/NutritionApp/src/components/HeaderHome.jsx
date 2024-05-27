import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image, FlatList, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HeaderHome = () => {
    const DATA = [
        {
            id: '1',
            title: 'Dashboard',
        },
        {
            id: '2',
            title: 'Charts',
        },
        {
            id: '3',
            title: 'Report',
        },
        {
            id: '4',
            title: 'Third Item',
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
            <View style={styles.topheader}>
                <View style={styles.logotop}>
                    <Image
                        source={require("../../assets/logo.png")}
                        style={styles.logoImage}
                    />
                    <Text style={styles.toptext}>Nutritionist</Text>
                </View>
                <View style={styles.rightheader}>
                    <TouchableOpacity>
                        <Ionicons name='notifications-outline' size={40} style={styles.icon} />
                    </TouchableOpacity>
                </View>
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

const styles = StyleSheet.create({
    container: {},
    topheader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomheader: {
        alignItems: 'center'
    },
    logotop: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightheader: {
        marginRight: 10,
        marginTop: 10,
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    toptext: {
        fontSize: 30,
        fontWeight: '700',
        color: '#006666'
    },
    icon: {
        color: '#6CB745'
    },
    horizontalscroll: {
        width: '96%',
        paddingBottom: 10

    },
    flatlist: {
        backgroundColor: '#EBF2F9',
        paddingVertical: 5,
        borderRadius: 15
    },
    title: {},
    safecontainer: {
        backgroundColor: '#EBF2F9',
        borderRadius: 15,
    },
    item: {
        marginHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
        color: '#fff',
        borderColor: '#000',


    },
    tabtext: {
        paddingHorizontal: 10,
        fontWeight: 500,
        fontSize: 14


    }
});

export default HeaderHome;
