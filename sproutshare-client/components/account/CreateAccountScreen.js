import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles'


// The screen where users can input their username and password to log into an existing account
function CreateAccountScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [zipCode, setZipCode] = useState(0);
    const [accessToken, setAccessToken] = useState('');

    function usernameInputHandler(username) {
        setUsername(username);
    }

    function passwordInputHandler(password) {
        setPassword(password);
    }

    function zipCodeInputHandler(zipCode) {
        setZipCode(zipCode);
    }


    async function createUser(username, password) {
        await axios.post(`${props.nodeServer}/register`, {
            username: username,
            password: password,
            zip_code: zipCode
        }).catch(err => {
            if(err.response.status == 400) {
                {/** To be implemented on backend */}
                console.log('User already exists');
            } else {
                console.log(err.message);
            }
        });
    }

    return (

        <View style = {{
            flex: 1,
            justifyContent: "center"
        }}>
        <ImageBackground source={require("../../assets/Newlogin.png")} style={styles.backgroundImage}>
        <View style = {{flexDirection: 'row', marginTop: 35, marginBottom: 80}}>
        <Text style = {styles.titleText}>Create Account</Text>
        <Image source={require("../../assets/PFPicon.png")} style ={styles.newProfile}></Image>
        </View>
        <TextInput 
            style = {[
            styles.accountInput,
            {backgroundColor: "#e0e8d0"}]
            }
            placeholder = "Username:"
            onChangeText={usernameInputHandler}
            value={username}
        />
        
        <TextInput 
            style = {[
                styles.accountInput,
                {backgroundColor: "#c1d9bc"}]
                }
            secureTextEntry={true}
            placeholder = "Password:"
            onChangeText={passwordInputHandler}
            value={password}
        />

        <TextInput 
            style = {[
                styles.accountInput,
                {backgroundColor: "#5ab07d"}]
                }
            placeholder = "Zip Code:"
            onChangeText={zipCodeInputHandler}
            value={zipCode}
        />
        <TouchableOpacity
            onPress={() => {
                createUser(username, password);
                console.log("Account created: " + username);
                props.navigation.navigate('LogInScreen', {
                    userName: username, userType: 'User'
                })
            }}
            style={[styles.roundButton2, {marginTop: 30}]}>
            <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </ImageBackground>
        </View>
        
    )
}

export default CreateAccountScreen;