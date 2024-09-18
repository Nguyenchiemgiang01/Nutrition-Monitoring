import { Image, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Text } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import style from "./loginstyle";
import { validate } from "./validateconfig"
import { loginRequest } from "./LoginReq";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResetPasswordPopup from "../../components/Popup/ResetPasswordPopup";
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError(validate.IN_EMAIL_FORMAT);
      return;
    } else {
      setEmailError('');
    }
    if (password.length < 6) {
      setPasswordError(validate.IN_PASSWORD);
      return;
    } else {
      setPasswordError('');
    }
    if (emailError == '' & passwordError == '') {
      const response = await loginRequest(email, password);
      if (response.status == 200) {
        const accessToken = response.data.access_token;
        await AsyncStorage.setItem('access_token', accessToken);
        navigation.navigate('Userpage')
      }
    }
    else {
      console.log('error')
    }
  }
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../../assets/wheel1.jpg")}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Welcome!</Text>
        <Text style={styles.signInText}>Sign into your account!</Text>
      </View>
      <View style={styles.arealogin}>
        <View style={styles.inputlogin}>
          <View style={styles.groupinput}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.icon} size={30} />
            <TextInput
              style={styles.input}
              placeholder="Your email..."
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {emailError ? <Text style={styles.error}><Text style={styles.errorText}>{emailError}</Text></Text> : null}
        </View>

        <View style={styles.inputlogin}>
          <View style={styles.groupinput}>
            <FontAwesomeIcon icon={faKey} style={styles.icon} size={30} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholder="Password..."
              keyboardType="numeric"
              value={password}
              onChangeText={(text) => setPassword(text)}

            />
            <TouchableOpacity style={styles.iconShowPassword} onPress={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={styles.icon} size={25} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.error}><Text style={styles.errorText} >{passwordError}</Text> </Text> : null}
        </View>

        <View style={styles.btnlogin}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.textforget} onPress={toggleModal}> Forget password !</Text>
        </View>
        <View>
          <ResetPasswordPopup isVisible={isModalVisible} onClose={toggleModal} />
        </View>


      </View>
      <View style={styles.createAccountText}>
        <Text style={styles.textBottom}>Don't have an account !
          <Text style={styles.create} onPress={() => navigation.navigate('Signup')}> Create</Text>
        </Text>
      </View>

    </View>
  );
};


export default LoginScreen;


const styles = StyleSheet.create(style)