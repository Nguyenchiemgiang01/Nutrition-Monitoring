import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../Dashboard/DashboardScreen"
import HeaderHome from '../../components/HeaderHome';
import ChartScreen from '../ChartScreen/ChartScreen';
import Report from '../Report/Report';
import Meals from '../Meals/Meals';
const Stack = createNativeStackNavigator();
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <HeaderHome style={styles.header}></HeaderHome>

            <Stack.Navigator
                style={styles.maincontent}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen style={styles.dashboard} name="Dashboard" component={DashboardScreen} />
                <Stack.Screen style={styles.chart} name="Charts" component={ChartScreen} />
                <Stack.Screen style={styles.chart} name="Report" component={Report} />
                <Stack.Screen style={styles.chart} name="Meals" component={Meals} />

            </Stack.Navigator>
        </View>


    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        header: {

            backgroundColor: '#fff'
        },
        maincontent: {

            backgroundColor: '#E0E0E0'
        },
        dashboard: {

            backgroundColor: '#FF99CC',

        }
    }
)
