
import { Image, ScrollView, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Text } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faEyeSlash, faEye, faUser, faSignature, faLock } from '@fortawesome/free-solid-svg-icons'
import style from "./signupstyle"
import { validate } from "./validateconfigsignup";
import { useNavigation } from "@react-navigation/native";
import { signUp } from './SignupReq'
import PersonalInfo from "../PersonalInfor/PersonalInfo";
const Sign = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [confirmpasswordError, setconfirmPasswordError] = useState('');
  // const [dataccount, setDataccount] = useState();
  const navigation = useNavigation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };
  const handleSignUp = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username == '') {
      setUsernameError(validate.IN_USERNAME)
    }
    else {
      setUsernameError('')
    }
    if (fullname == '') {
      setFullnameError(validate.IN_FULLNAME)
    }
    else {
      setFullnameError('')
    }
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
    if (confirmpassword != password) {
      setconfirmPasswordError(validate.IN_CONFIRM_PASSWORD);

      return;
    } else {
      setconfirmPasswordError('');
    }

    if (emailError == '' & passwordError == '' & usernameError == '' & fullnameError == '' & confirmpasswordError == '') {
      try {
        const userData = { 'username': username, 'password': password, 'email': email, 'fullname': fullname };
        // const response = await signUp(userData);
        // const user = response.user;
        // Alert.alert('', response.message)
        // console.log(response)
        navigation.navigate('PersonalInfo', { userData })
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollsignup}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Welcome!</Text>
          <Text style={styles.signInText}>Signup to get started !</Text>
        </View>

        <SafeAreaView style={styles.areasignup}>
          <View style={styles.inputsignup}>
            <View style={styles.groupinput}>
              <FontAwesomeIcon icon={faUser} style={styles.icon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            {usernameError ? <Text style={styles.error}><Text style={styles.errorText} >{usernameError}</Text> </Text> : null}
          </View>
          <View style={styles.inputsignup}>
            <View style={styles.groupinput}>
              <FontAwesomeIcon icon={faSignature} style={styles.icon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                value={fullname}
                onChangeText={(text) => setFullname(text)}
              />
            </View>
            {fullnameError ? <Text style={styles.error}><Text style={styles.errorText} >{fullnameError}</Text> </Text> : null}
          </View>
          <View style={styles.inputsignup}>
            <View style={styles.groupinput}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)
                }
              />

            </View>

            {emailError ? <Text style={styles.error}><Text style={styles.errorText}>{emailError}</Text></Text> : null}
          </View>


          <View style={styles.inputsignup}>
            <View style={styles.groupinput}>
              <FontAwesomeIcon icon={faLock} style={styles.icon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                keyboardType="numeric"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}

              />
              <TouchableOpacity style={styles.iconShowPassword} onPress={toggleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={styles.icon} size={25} />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.error}><Text style={styles.errorText} >{passwordError}</Text> </Text> : null}
          </View>
          <View style={styles.inputsignup}>
            <View style={styles.groupinput}>
              <FontAwesomeIcon icon={faLock} style={styles.icon} size={30} />
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                keyboardType="numeric"
                secureTextEntry={!showconfirmPassword}
                value={confirmpassword}
                onChangeText={(text) => setconfirmPassword(text)}

              />
              <TouchableOpacity style={styles.iconShowPassword} onPress={toggleShowconfirmPassword}>
                <FontAwesomeIcon icon={showconfirmPassword ? faEye : faEyeSlash} style={styles.icon} size={25} />
              </TouchableOpacity>
            </View>
            {confirmpasswordError ? <Text style={styles.error}><Text style={styles.errorText} >{confirmpasswordError}</Text> </Text> : null}
          </View>

          <View style={styles.btnlogin}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp} >
              <Text style={styles.buttonText} >Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.switchlogin}>
          <Text style={styles.textBottom}>Already have an Account !
            <Text style={styles.create} onPress={() => navigation.navigate('Login')}> Login</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Sign;
const styles = StyleSheet.create(style);
