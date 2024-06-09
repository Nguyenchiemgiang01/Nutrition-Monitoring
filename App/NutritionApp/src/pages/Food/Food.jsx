
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderFood from '../../components/HeaderFood';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import config from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodItem from '../../components/FoodItem';
import moment from 'moment';

const Food = () => {
    const navigation = useNavigation()
    const [numbermeal, setNumberMeal] = useState()
    const [isdiet, setIsDiet] = useState(false)
    const [recommendation, setRecommendation] = useState([]);
    const [uncategory, setUncategory] = useState()
    const [breakfast, setBreakFast] = useState([])
    const [snack, setSnack] = useState()
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])
    const [ncfrec, setNCFRec] = useState([])
    const date = moment().format('YYYY-MM-DD')
    const getSuggest = async () => {
        console.log(numbermeal)
        console.log(isdiet)
        let response = null
        const accessToken = await AsyncStorage.getItem('access_token');

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };


        try {
            response = await axios.post(`${config.BASE_URL}/diary/recommend`, {
                number_meal: numbermeal,
                is_diet: isdiet,
            }, {
                headers: headers,
                cache: 'no-cache'
            });
            if (response.data) {
                const result = response.data["recommend_result"]
                setRecommendation(result);
                console.log("rec", result.length)
                if (isdiet == "true") {
                    if (result.length == 3) {
                        setBreakFast(result[0])
                        setLunch(result[1])
                        setDinner(result[2])
                        setSnack([])
                        setUncategory([])
                    }
                    if (result.length == 4) {
                        setBreakFast(result[0])
                        setLunch(result[1])
                        setDinner(result[2])
                        setSnack(result[3])
                        setUncategory([])

                    }
                    if (result.length == 5) {
                        setBreakFast(result[0])
                        setLunch(result[1])
                        setDinner(result[2])
                        setSnack(result[3])
                        setUncategory(result[4])
                    }

                } else {
                    setNCFRec(result[0])
                }

            } else {
                console.error('No record found or other error');
            }
        } catch (error) {
            console.error('Error fetching consume data:', error);
        }


    }
    useEffect(() => {
        console.log(snack)
    }, [snack]);
    return (
        <View style={styles.container}>
            <HeaderFood></HeaderFood>
            <View style={styles.content}>
                <ScrollView style={styles.content}>
                    <View style={styles.recommentblock}>
                        <View style={styles.title}>
                            <Ionicons name='layers-outline' size={30}></Ionicons>
                            <Text style={styles.titletext}> Food Recommend </Text>
                        </View>
                        <View style={styles.inputview}>
                            <View style={styles.numbermeal}>
                                <Text style={styles.text}>Number of meals</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        onValueChange={(itemValue) => setNumberMeal(itemValue)}
                                        selectedValue={numbermeal}
                                    >
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                    </Picker>
                                </View>

                            </View>
                            <View style={styles.numbermeal}>
                                <Text style={styles.text}>Is Diet ?</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={isdiet}
                                        onValueChange={(itemValue) => setIsDiet(itemValue)}
                                    >
                                        <Picker.Item label="true" value="true" />
                                        <Picker.Item label="false" value="false" />

                                    </Picker>
                                </View>

                            </View>
                            <View style={styles.getbutton}>
                                <TouchableOpacity style={styles.button} onPress={getSuggest}>
                                    <Text style={styles.textbtn}> Get Suggestion</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.data_response}>
                        {isdiet == "true" ? (
                            <View style={styles.dietView}>
                                {breakfast && (
                                    <View>
                                        <Text style={styles.title}>Breakfast</Text>
                                        {breakfast.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {lunch && (
                                    <View>
                                        <Text style={styles.title}>Lunch</Text>
                                        {lunch.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {dinner && (
                                    <View>
                                        <Text style={styles.title}>Dinner</Text>
                                        {dinner.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {snack && (
                                    <View>
                                        <Text style={styles.title}>Snack</Text>
                                        {snack.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {uncategory && (
                                    <View>
                                        <Text style={styles.title}>Uncategory</Text>
                                        {uncategory.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}

                                <View style={styles.meal}></View>

                            </View>
                        ) : (
                            <View style={styles.nonDietView}>
                                {ncfrec && (
                                    <View>
                                        <Text style={styles.title}>Food Recommend</Text>
                                        {ncfrec.map((item, index) => (
                                            <View key={index} style={styles.meal}>
                                                <FoodItem items={item} status={0} iscreatemeal={0} date={date} group={1} />
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    content: {
        padding: 5
    },

    recommentblock: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        height: 300,
        borderWidth: 1,
        borderColor: '#ccc'

    },
    titletext: {
        fontSize: 24,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    title: {
        flexDirection: "row",
        marginBottom: 20,
        fontSize: 22,
        fontWeight: 'bold'
    },

    numbermeal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#006666',
        fontWeight: 'bold'

    },
    pickerContainer: {
        marginLeft: 20,
        width: 120,
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 10

    },
    inputview: {
        marginLeft: 10
    },

    button: {
        marginTop: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start'

    },
    textbtn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        backgroundColor: '#006666',
        borderRadius: 10,
        fontStyle: 'italic'
    },
    data_response: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 20,
        marginBottom: 200,
        borderWidth: 1,
        // borderColor: '#ccc'


    }

});

export default Food;
