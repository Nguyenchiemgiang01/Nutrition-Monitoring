import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import HeaderSearch from '../../components/HeaderSearch';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export default FoodSearch = () => {
    const navigation = useNavigation()
    const [searchResults, setSearchResults] = useState();
    const route = useRoute();
    const { selecteddate, iscreatemeal } = route.params;
    let date = selecteddate
    console.log("datesearch", date)
    const handleSearch = (results) => {
        setSearchResults(results)

    };
    const status = 0
    const group = 1
    const navtodetail = (food) => {
        navigation.navigate('FoodDetail', { food, status, date, iscreatemeal, group })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderSearch onClose={() => navigation.navigate('Diary')} onResults={handleSearch}></HeaderSearch>
            </View>

            <ScrollView style={styles.content}>
                {searchResults && (
                    <View style={styles.listfood}>
                        {searchResults.map((result, index) => (

                            <View key={index} style={styles.containeritem}>
                                <TouchableOpacity style={styles.fooditem} onPress={() => navtodetail({
                                    "foodid": result.FoodId, "name": result.Name, "calories": result.Calories,
                                    "protein": result.Protein, "carbs": result.Carbohydrate, "fat": result.Fat, "sugar": result.Sugar,
                                    "cholesterol": result.Cholesterol, "sodium": result.Sodium, 'fiber': result.Fiber
                                }, { date })}  >
                                    <Text style={styles.name} >{result.Name}</Text>
                                    <Text style={styles.calories}>{result.Calories} kcal</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>)}

            </ScrollView>
        </View>


    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',

        },
        header: {
            backgroundColor: '#fff'
        },
        target: {
            width: '94%',
            marginLeft: 10,
            marginTop: 3

        },
        texttarget: {
            marginBottom: 5,
            fontSize: 16,

        },
        content: {
            flex: 1,
            backgroundColor: '#FDFDF8',
            paddingTop: 20,
            paddingHorizontal: 5,
            marginBottom: 10
        },
        categories: {
            marginTop: 20
        },
        listfood: {
            padding: 10
        },
        fooditem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
            height: 50,
            backgroundColor: '#fff',
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ccc'
        },
        name: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        calories: {
            fontSize: 16,
            color: '#888',
        },
        containeritem: {
            flex: 1
        }
    }
)
