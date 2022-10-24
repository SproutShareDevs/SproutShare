import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';


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
            props.saveToken(response.data.accessToken);
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
            //alignItems: "center"
        }}>
        <Text>Log In</Text>
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
        <Button
            onPress={async() => {
                await checkUser(username, password);
                console.log(loginStatus);
                if(loginStatus == "true") {
                    props.navigation.navigate('Home', {
                        userName: username, userType: 'User'
                    }) 
                    {/* For some reason, this alert is blank, even though the function is async */}
                } else {
                    alert(loginStatus);
                }
            }}
            title={
                "Log In"
            }
        />
        </View>
        
    )
}

export default LogInScreen;