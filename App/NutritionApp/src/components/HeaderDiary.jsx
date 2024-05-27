import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
const HeaderDiary = ({ onDateChange }) => {
    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [iscomplete, setIsComplete] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const handlePrevDay = () => {
        setShowDatePicker(false)
        // console.log(showDatePicker)
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);
        onDateChange(newDate);
    };

    const handleNextDay = () => {
        setShowDatePicker(false)
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);
        onDateChange(newDate);

    }
    const handleOnChange = (event, date) => {
        setShowDatePicker(false);
        if (event.type === 'set') {
            setSelectedDate(date || selectedDate);
            onDateChange(date || selectedDate);
        }
    };
    const showCalender = () => {
        setShowDatePicker(true)
        console.log(showDatePicker)

    };
    const toggleiscomplete = () => {
        setIsComplete(!iscomplete)
    }
    const handleAdd = () => {
        setModalVisible(true);
    }
    const handleAddFood = () => {
        setModalVisible(false);
        // console.log("date:", selectedDate)
        navigation.navigate('FoodSearch', { date: selectedDate.toISOString() })


    }
    const handleAddExercise = () => {
        setModalVisible(false);
        navigation.navigate('AddExercise', { date: selectedDate.toISOString() });
    }
    const iconName = iscomplete ? 'chevron-down-circle' : 'chevron-down-circle-outline';
    return (
        <View style={styles.container}>
            <View style={styles.containeritem}>
                <View style={styles.iscomplete}>
                    <TouchableOpacity onPress={toggleiscomplete}>
                        <Ionicons name={iconName} style={styles.iconcomplete}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handlePrevDay} ><Text><Ionicons style={styles.prn} name={'chevron-back-outline'}></Ionicons> </Text></TouchableOpacity>
                    <TouchableOpacity onPress={showCalender} style={styles.date}>
                        <Text style={styles.datetime}>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity title=">" onPress={handleNextDay} style={styles.prn} ><Text><Ionicons style={styles.prn} name={'chevron-forward-outline'}></Ionicons> </Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.iscomplete} onPress={handleAdd}><Ionicons name='add-outline' style={styles.iconcomplete}></Ionicons></TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleAddFood}>
                                        <Ionicons name="logo-apple" size={30} color={'#FF3333'}></Ionicons>
                                        <Text style={styles.modalButtonText}>Add Food</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleAddExercise}>
                                        <Ionicons name="accessibility" size={30} color={'#00CCCC'}></Ionicons>
                                        <Text style={styles.modalButtonText}>Add Exercise</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    style={styles.datePicker}
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleOnChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 6,
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    datePicker: {
        width: 200,
    },
    date: {
        marginHorizontal: 10
    },
    datetime: {
        fontSize: 24
    },

    prn: {
        color: '#000',
        fontSize: 24,


    },
    iscomplete: {

        justifyContent: 'center'
    },
    iconcomplete: {
        fontSize: 30,
        marginTop: 20,
        color: '#009999',

    },
    containeritem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 50,
        marginLeft: 70,
        alignItems: 'center',

        // backgroundColor: 'rgba(0,0,0,0.5)',

    },
    modalContent: {
        width: '50%',
        backgroundColor: '#FAEBF9',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F764E9',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20
    },
    modalButton: {
        marginVertical: 10,
        borderRadius: 10,
        width: '80%',
        flexDirection: 'row',

    },
    modalButtonText: {
        color: '#000',
        fontSize: 20,
        marginLeft: 10
    }
});

export default HeaderDiary;
