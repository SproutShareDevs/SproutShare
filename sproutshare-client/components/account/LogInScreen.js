import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, Alert, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles'

// The screen where users can input their username and password to log into an existing account
function LogInScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [accessToken, setAccessToken] = useState('');

    function usernameInputHandler(username) {
        setUsername(username);
    }

    function passwordInputHandler(password) {
        setPassword(password);
    }


    async function checkUser(myUsername, myPassword) {
        await axios.post(`${props.nodeServer}/login`, {
            username: username,
            password: password
        }).then((response) => {
            setLoginStatus("true");
            props.saveToken(response.data.userAccessToken);
            console.log("Access token retrieved");
        }).catch(err => {
            if(err.response.status == 400) {
                setLoginStatus("Invalid username");
                console.log('Invalid username');
            } else if (err.response.status == 401) {
                setLoginStatus("Username and password do not match");
                console.log('Username and password do not match');
            } else {
                console.log(err.message);
            }
        })
    }

    return (

        <View style = {{
            flex: 1,
            justifyContent: "center",
        }}>
        <ImageBackground source = {require("../../assets/Newlogin.png")} style={styles.backgroundImage}>
        <View style = {{flexDirection: 'row'}}>
        <View style = {{marginTop: 75, marginBottom: 80, marginLeft: 20}}>
        <Text style = {styles.titleText}>Sign In</Text>
        </View>
        <View style = {{marginTop: 40, marginBottom: 80, marginLeft: 15}}>
        <Image source={require("../../assets/signIn.png")} style = {styles.tinyImage}></Image>
        </View></View>
        <TextInput 
            style = {[
            styles.accountInput,
            {backgroundColor: "#e0e8d0", marginTop: 60}]
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
        <TouchableOpacity
            onPress={async() => {
                await checkUser(username, password).then(() =>{
                    if(loginStatus == "true") {
                        props.navigation.navigate('Home', {
                            userName: username, userType: 'User'
                        }) 
                        {/* For some reason, this alert is blank, even though the function is async */}
                    } else {
                        alert(loginStatus);
                    }
                });
            }}
            style={[styles.roundButton2, {marginTop:60}]}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </ImageBackground>
        </View>
        
    )
}

export default LogInScreen;