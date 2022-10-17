import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';


function CreateAccount(props) {

        return (
            <View>
                <Text>Wow, you're a user!
                    Your username is {props.userName}, and you are a(n) {props.userType}!
                </Text>
                <Button
                    onPress={() => {
                        props.deleteAccessToken();
                        props.navigation.navigate('LogInTop');
                    }}
                    title={
                        "Logout"
                    }
                />
                <Button
                    title={"Retrieve Token"}
                    onPress={props.getCurrentAccessToken}
                />
            </View>
            
        );
}

export default CreateAccount;