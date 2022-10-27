import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';


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
            justifyContent: "center",
            //alignItems: "center"
        }}>
        <Text>Create Account</Text>
        <TextInput 
            style = {{
            height: 30,
            borderColor: 'light-gray',
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginLeft: 10
            }}
            placeholder = "Username:"
            onChangeText={usernameInputHandler}
            value={username}
        />
            
        <TextInput 
            style = {{
            height: 30,
            borderColor: 'light-gray',
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginLeft: 10
            }}
            secureTextEntry={true}
            placeholder = "Password:"
            onChangeText={passwordInputHandler}
            value={password}
        />

        <TextInput 
            style = {{
            height: 30,
            borderColor: 'light-gray',
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginLeft: 10
            }}
            placeholder = "Zip Code:"
            onChangeText={zipCodeInputHandler}
            value={zipCode}
        />
        <Button
            onPress={() => {
                createUser(username, password);
                console.log("Account created: " + username);
                props.navigation.navigate('LogInScreen', {
                    userName: username, userType: 'User'
                })
            }}
            title={
                "Log In"
            }
        />
        </View>
        
    )
}

export default CreateAccountScreen;