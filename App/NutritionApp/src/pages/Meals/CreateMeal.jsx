import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import HeaderCreateMeal from '../../components/HeaderCreateMeal';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var list_foodname = []
var list_foodid = []


const CreateMeal = ({ route }) => {

    const [namemeal, setNamemeal] = useState('');
    const navigation = useNavigation()
    const gofoodsearch = () => { navigation.navigate('FoodSearch', { iscreatemeal }) }
    const iscreatemeal = 1
    const [foonamess, setFoodnamess] = useState('')
    useEffect(() => {
        if (route.params) {
            const { foodids, foodname, foodcalories } = route.params;
            if (foodids !== undefined) {
                list_foodid.push(foodids);
                setFoodnamess(foodname)
                console.log(foodids, list_foodname)
                list_foodname.push({ "id": foodids, "name": foodname, "calories": foodcalories });
            }
        }
    }, [route.params]);
    const createPersonalMeal = async () => {
        console.log("list", list_foodid, list_foodname)

        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.post(
                `${config.BASE_URL}/personalmeal`,
                {
                    "listfoodid": list_foodid,
                    "name": namemeal
                },
                { headers: headers }
            );

            if (response.status === 201) {
                Alert.alert('Success', 'Create meal successfully');
                list_foodid.length = 0
                list_foodname.length = 0
                setNamemeal('');
            } else {
                console.log('Failed to create meal');
                list_foodid.length = 0
                list_foodname.length = 0
            }
        } catch (error) {
            list_foodid.length = 0
            list_foodname.length = 0
        }
    };

    const handelcreatmeal = () => {
        console.log("listid", list_foodid.length)
        if (list_foodid.length > 0) {
            createPersonalMeal()
            navigation.setParams({ foodids: undefined, foodname: undefined, foodcalories: undefined });
        }
        else {
        }
    }
    const handleremove = (id) => {
        console.log("id", id)
        let index = list_foodid.indexOf(parseInt(id));
        console.log(index)
        // // Nếu tìm thấy phần tử có id là 1, xóa nó khỏi mảng
        if (index !== -1) {
            list_foodid.splice(index, 1);
            list_foodname.splice(index, 1);
            setFoodnamess('a')
        }


    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderCreateMeal ></HeaderCreateMeal>
            </View>

            <View style={styles.itemcontainer}>
                <View style={styles.name}>
                    <Text style={styles.textname}> Meal's name</Text>
                    <TextInput style={styles.namemeal}
                        placeholder=""
                        value={namemeal}
                        onChangeText={(text) => setNamemeal(text)}></TextInput>
                </View>
                <View style={styles.addbtn}>
                    <TouchableOpacity onPress={gofoodsearch} style={styles.btnadd}>
                        <Ionicons name='add' size={30} color={"#66CC00"}></Ionicons>
                        <Text style={styles.textadd}>Add food</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listmealitem}>
                    {list_foodname.map((item, index) => (
                        <View style={styles.fooditem} key={index}>
                            <Text style={styles.foodname}>{item.name}</Text>
                            <View style={styles.right}>
                                <Text style={styles.textcalories}>{item.calories} kcal</Text>
                                <TouchableOpacity style={styles.removeitem} onPress={() => handleremove(item.id)} >
                                    <Ionicons name='close-circle-outline' size={24} color={"#CC0000"}></Ionicons>
                                </TouchableOpacity>
                            </View>
                        </View>

                    ))}
                </View>

                <View style={styles.createbtn}>
                    <TouchableOpacity onPress={handelcreatmeal} style={styles.create} >
                        <Text style={styles.textcreate}>Create meal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        backgroundColor: '#fff',
    },
    itemcontainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        minHeight: 500,
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    namemeal: {
        width: 200,
        height: 40,
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    textname: {
        fontSize: 24,
        color: '#009999',
        fontWeight: 'bold'
    },
    addbtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btnadd: {
        padding: 5,
        marginBottom: 5,
        width: 100,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    createbtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    create: {
        padding: 5,
        backgroundColor: '#000066',
        marginBottom: 5,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
    },
    textadd: {
        color: "#66CC00",
        fontWeight: 'bold',
        fontSize: 18
    },
    fooditem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    foodname: {
        fontSize: 18,
    },
    textcalories: {
        fontSize: 16,
        color: '#888',
        marginRight: 10
    },
    textcreate: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    listmealitem: {
        borderWidth: 0.2,
        minHeight: 200,
        borderRadius: 10,
        padding: 20

    },
    right: {
        flexDirection: 'row',

    }



});

export default CreateMeal;
