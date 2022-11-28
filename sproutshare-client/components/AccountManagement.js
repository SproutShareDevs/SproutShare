import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import registerNNPushToken from 'native-notify';
import { registerIndieID } from 'native-notify';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import styles from '../styles/styles.js'





function AccountManagement(props) {
    const [days, setDays] = useState(0);
    const [rain, setRain] = useState(0);

    Notifications.setNotificationHandler({
        handleNotification: async => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false
        }),
    });

    async function alertCurrentAccessToken() {
        let result = await SecureStore.getItemAsync('AccessToken');
        if (result) {
            alert("🔐 Here's your access token 🔐 \n" + result);
        } else {
            alert('No access token in storage');
        }
    }

    async function deleteAccessToken() {
        await SecureStore.deleteItemAsync('AccessToken');
        console.log("Deleted access token");
    }

    async function registerForPushNotifications() {
        let result = await SecureStore.getItemAsync('AccessToken');
        if (result) {
            registerIndieID(result, 4505, 'ru8YeSvU7Wot11tFPoaxwX');
            alert('Registered for Push Notifications');

        }
        else {
            alert('No access token in storage');
        }
    }

    const advanceDays = async () => {
        let token = await SecureStore.getItemAsync('AccessToken');
        console.log(token);
        await axios.put(`${props.nodeServer}/userPlants/advancedays`, {
            rain_amount: rain,
            days: days  
        }, {headers: {
            Authorization: `Bearer ${token}`
        }}).then((response) => {
            console.log(response);
            console.log('Time has been advanced.');
        }).catch((err) => {
            console.log(err);
        });
    }

    const triggerLocalNotificationHandler = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Local Notification",
                body: "Hello this is a local notification!",
            },
            trigger: { seconds: 5 },
        })
    }

    return (
        <View style={{
            marginTop: 50
        }}>
            <Text>Wow, you're a user!
                Your username is {props.userName}, and you are a(n) {props.userType}!
            </Text>
            <Button
                onPress={() => {
                    deleteAccessToken();
                    props.navigation.navigate('LogInTop');
                }}
                title={
                    "Logout"
                }
            />
            <Button
                title={"Retrieve Token"}
                onPress={alertCurrentAccessToken}
            />
            <Button
                title={"Schedule a push notification"}
                onPress={triggerLocalNotificationHandler}
            />

            <TextInput
                style={[styles.accountInput,
                { marginBottom: 10,
                  marginTop: 10
                }
                ]}
                keyboardType='numeric'
                placeholder='number of days'
                onChangeText={text => setDays(text)}
                value={days}
            />

            <TextInput
                style={[styles.accountInput,
                { marginBottom: 10 }
                ]}
                keyboardType='numeric'
                placeholder='amount of rain in inches'
                onChangeText={text => setRain(text)}
                value={rain}
            />

            <Button
                title="Advance Time"
                onPress={advanceDays}
            />
        </View>

    );

}
export default AccountManagement;