import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import style from '../Dashboard/Dashboardstyle';
import PercentageCircle from '../../components/PercentageCircle';
import ParameterItem from '../../components/ParamItem'
import Measure from '../../components/Measure';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../config';
import moment from 'moment';
import axios from 'axios';
export default function DashboardScreen() {
    const [userinfo, setUserInfo] = useState({})
    const [goal, setGoal] = useState(0)
    const [calorconsume, setCalorConsume] = useState(0)
    const [calorExercise, setcalorExercise] = useState(0)
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()

    const getInfo = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/user/profile`, {
                headers: headers
            });
            setUserInfo(response.data)
            setAge(response.data.personal_info.age)
            setGender(response.data.personal_info.gender)
            setHeight(response.data.personal_info.height)
            setWeight(response.data.personal_info.weight)
            setGoal(response.data.personal_info.caloriesgoal)
        } catch (error) {
            console.error('Error fetching info data:', error);
        }
    }
    const getConsume = async () => {
        today = moment().format('YYYY-MM-DD')
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/consume/${today}`, {
                headers: headers
            });

            if (response.status === 200) {

                setCalorConsume(response.data.a_consume.Calories)
                console.log(response.data.a_consume.Calories)
            } else {
                console.error('No record found or other error');
            }
        } catch (error) {
            return 0
        }
    }

    const getExercise = async () => {
        today = moment().format('YYYY-MM-DD')
        const accessToken = await AsyncStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.get(`${config.BASE_URL}/exercise/${today}`, {
                headers: headers
            });
            setcalorExercise(-parseFloat(response.data.exercises[0].CaloriesPerHour) * parseFloat(response.data.exercises[0].Time) / 60)
        } catch (error) {
            setcalorExercise(0)
            return 0
        }
    }
    const getBMICategory = (bmi) => {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Fat';
        }
    };

    useEffect(() => {
        getInfo();
        getConsume();
        getExercise();
    }, []);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.maincontainer}>
                <ScrollView>
                    <SafeAreaView style={styles.remain}>
                        <Text style={styles.toptext}> Calories </Text>
                        <Text style={styles.textremain}> Remainning = Goal - Food + Excercise </Text>
                        <View style={styles.remaincontent}>
                            <PercentageCircle percentage={calorconsume ? parseFloat(calorconsume) * 100 / goal : 0} remainning={calorconsume ? (goal - calorconsume).toFixed(1) : goal} />
                            <View style={styles.parameter}>
                                <ParameterItem iconName="flag-outline" title="Base goal" value={goal} coloricon="#66CC00" />
                                <ParameterItem iconName="restaurant-outline" title="Food" value={calorconsume - calorExercise ? (calorconsume - calorExercise).toFixed(1) : 0} coloricon="#FF9933" />
                                <ParameterItem iconName="bicycle-outline" title="Exercise" value={calorExercise ? calorExercise : 0} coloricon="#CCCC00" />

                            </View>
                        </View>


                    </SafeAreaView>
                    <SafeAreaView style={styles.goal}>
                        <Text style={styles.toptext}> Parameter</Text>
                        <View style={styles.mesuare}>
                            <Measure name="Age" value={age} unit="   " />
                            <Measure name="Sex" value={gender} unit="   " />
                            <Measure name="Weight" value={weight} unit=" kg" />
                            <Measure name="Height" value={height} unit="cm" />
                            <Measure name="Body Mass Index (BMI)" value={(parseFloat(weight) / parseFloat(height) / parseFloat(height) * 10000).toFixed(1)} unit=" % " />
                            <Measure name="Body Fat" value={getBMICategory((parseFloat(weight) / parseFloat(height) / parseFloat(height) * 10000).toFixed(1))} unit=" " />

                        </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create(style);
