import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';



class CreateAccount extends React.Component {
    render() {

        return (
            <View>
                <Text>Wow, you're a user!
                    Your username is {this.props.userName}, and you are a(n) {this.props.userType}!
                </Text>
                <Button
                    onPress={() => this.props.navigation.navigate('LogInTop')}
                    title={
                        "Logout"
                    }
                />
            </View>
            
        );
    }
}

export default CreateAccount;