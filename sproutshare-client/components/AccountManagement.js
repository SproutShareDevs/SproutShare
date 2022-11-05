import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import registerNNPushToken from 'native-notify';
import {registerIndieID} from 'native-notify';
import axios from 'axios';
function AccountManagement(props) {

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
            if (result){
                registerIndieID(result, 4505, 'ru8YeSvU7Wot11tFPoaxwX');
                alert('Registered for Push Notifications');
     
            }
            else {
                alert('No access token in storage');
            }


        
    }
    async function testPush() {
        let result = await SecureStore.getItemAsync('AccessToken');
        if (result) {
            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: result,
            appId: 4505,
            appToken: 'ru8YeSvU7Wot11tFPoaxwX',
            title: 'Push Notifications are working',
            message: 'Thank goodness these push notifications are working'
        });
            alert('Notification Pushed');
    } else {
        alert('No access token in storage');
    }
         
    }
    

        return (
            <View>
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
                    title={"Register For Push Notifications"}
                    onPress={registerForPushNotifications}
                />
                <Button
                    title={"Test Push Notifications"}
                    onPress={testPush}
                />
            </View>
            
        );
}

export default AccountManagement;