import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';


// The screen where users can input their username and password to log into an existing account
function LogInScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            console.log("Access token retrieved");
            props.saveToken(response.data.accessToken);
        }).catch(err => {
            if(err.response.status == 400) {
                console.log('Invalid username');
            } else if (err.response.status == 401) {
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
            //alignItems: "center"
        }}>
        <Text>Log In</Text>
        <TextInput 
            style = {{
            height: 30,
            borderColor: 'light-gray',
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1
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
            borderWidth: 1
            }}
            secureTextEntry={true}
            placeholder = "Password:"
            onChangeText={passwordInputHandler}
            value={password}
        />
        <Button
            onPress={() => {
                checkUser(username, password);
                props.navigation.navigate('Home', {
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

export default LogInScreen;