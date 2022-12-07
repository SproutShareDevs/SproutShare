import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, Alert, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles'
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';

// The screen where users can input their username and password to log into an existing account
function LogInScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    function usernameInputHandler(username) {
        setUsername(username);
    }

    function passwordInputHandler(password) {
        setPassword(password);
    }
    
    const handleButtonClick = () => {
        // when button is clicked, check credentials
        // then set loginStatus to result
        checkUser(username, password);
    }

    // once login status is changed, this code executes
    useEffect(() => {
        if (loginStatus == "true") {
            props.navigation.navigate('Home', {
                userName: username, userType: 'User'
            })
            getNotifications();
        } else if (loginStatus != "") {
            alert(loginStatus);
        }
    }, [loginStatus]);


    async function checkUser(myUsername, myPassword) {
        await axios.post(`${props.nodeServer}/login`, {
            username: username,
            password: password
        }).then((response) => {
            props.saveToken(response.data.userAccessToken);
            console.log("Access token retrieved");
            setLoginStatus("true");
        }).catch(err => {
            if (err.response.status == 400) {
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

    async function getNotifications() {
  
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${props.nodeServer}/notifications/user/${accessToken}`).then((response) => {
          let notification = response.data;
          console.log(response.data);
          if (notification.sendNotification === true) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Water Alert!",
              body: notification.notificationMessage,
            },
            trigger: { seconds: 5 },
          });
          }
        }).catch(err => {
          //console.log(`${this.props.nodeServer}/notifications/user/${accessToken}`);
          console.log('Error: Could not calculate notification', err);
        });
      }
      
    return (

        <View style={{
            flex: 1,
            justifyContent: "center",
        }}>
            <ImageBackground source={require("../../assets/Newlogin.png")} style={styles.backgroundImage}>
                <View style={{ flexDirection: 'row', marginBottom:30 }}>
                    
                    <Text style={[styles.titleText, {marginTop: 80}]}>Sign In</Text>
                    
                    <Image source={require("../../assets/signIn.png")} style={[styles.newProfile, {marginLeft:50, marginTop:50}]}></Image>
                    </View>
                <TextInput
                    style={[
                        styles.accountInput,
                        { backgroundColor: "#e0e8d0", marginTop: 60 }]
                    }
                    placeholder="Username:"
                    onChangeText={usernameInputHandler}
                    value={username}
                />

                <TextInput
                    style={[
                        styles.accountInput,
                        { backgroundColor: "#c1d9bc" }]

                    }
                    secureTextEntry={true}
                    placeholder="Password:"
                    onChangeText={passwordInputHandler}
                    value={password}
                />
                <TouchableOpacity
                    onPress={handleButtonClick}
                    style={[styles.roundButton2, { marginTop: 60 }]}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>

    )
}

export default LogInScreen;