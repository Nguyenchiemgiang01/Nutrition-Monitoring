import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import style from '../Dashboard/Dashboardstyle';
import PercentageCircle from '../../components/PercentageCircle';
import ParameterItem from '../../components/ParamItem'
import Measure from '../../components/Measure';
export default function DashboardScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.maincontainer}>
                <ScrollView>
                    <SafeAreaView style={styles.remain}>
                        <Text style={styles.toptext}> Calories </Text>
                        <Text style={styles.textremain}> Remainning = Goal - Food + Excercise </Text>
                        <View style={styles.remaincontent}>
                            <PercentageCircle percentage={60} remainning={1000} />
                            <View style={styles.parameter}>
                                <ParameterItem iconName="flag-outline" title="Base goal" value="1500" coloricon="#66CC00" />
                                <ParameterItem iconName="restaurant-outline" title="Food" value="500" coloricon="#FF9933" />
                                <ParameterItem iconName="bicycle-outline" title="Exercise" value="400" coloricon="#CCCC00" />

                            </View>
                        </View>


                    </SafeAreaView>
                    <SafeAreaView style={styles.goal}>
                        <Text style={styles.toptext}> Parameter</Text>
                        <View style={styles.mesuare}>
                            <Measure name="Age" value="22" unit="   " />
                            <Measure name="Sex" value="Male" unit="   " />
                            <Measure name="Weight" value="60" unit=" kg" />
                            <Measure name="Height" value="166.0" unit="cm" />
                            <Measure name="Body Mass Index (BMI)" value="23.9" unit="     " />
                            <Measure name="Body Fat" value="21.5" unit="  %" />

                        </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create(style);
