import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';


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
            </View>
            
        );
}

export default AccountManagement;