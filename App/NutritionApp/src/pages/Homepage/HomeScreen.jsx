import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../Dashboard/DashboardScreen"
import HeaderHome from '../../components/HeaderHome';

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
                {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
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

            backgroundColor: '#fff'
        },
        dashboard: {

            backgroundColor: '#FF99CC',

        }
    }
)
