import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import registerNNPushToken from 'native-notify';
import {registerIndieID} from 'native-notify';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device'





function AccountManagement(props) {

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

    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
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
      const [expoPushToken, setExpoPushToken] = useState('');
      const [notification, setNotification] = useState(false);
      const notificationListener = useRef();
      const responseListener = useRef();

      useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      }, []);

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
                    title={"Schedule a push notification"}
                    onPress={triggerLocalNotificationHandler}
                />
                <Text>Your expo push token: {expoPushToken}</Text>
            </View>
            
        );

}
export default AccountManagement;