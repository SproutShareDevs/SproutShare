import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button } from 'react-native';


class CreateAccount extends React.Component {
    state = {userType:"Guest", userName:false, user_ID:false, newUserButton: false};

    checkUser = (myUsername, myPassword) => {
        if (myUsername === "default" && myPassword === "default")
            return "User";
        if (myUsername === "admin" && myPassword === "admin")
            return "Admin";
        return false;
    }

    render() {
        

        if(this.state.userType === "Guest" && this.state.newUserButton === false){
            return(
                <View>
                <Button
                    onPress={() => {
                        this.setState({ newUserButton: "CreateAccount" });
                    }}
                    title={
                        "Create Account"
                    }
                />
                <Button
                    onPress={() => {
                        this.setState({ newUserButton: "LogIn" });
                    }}
                    title={
                        "Log In"
                    }
                />
                </View>
            )
        } else if(this.state.userType === "Guest" && this.state.newUserButton === "CreateAccount"){
            let newUsername, newPassword;
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
                    borderWidth: 1
                    }}
                    placeholder = "Username:"
                    onChangeText={newText => newUsername = newText}
                />
                    
                <TextInput 
                    style = {{
                    height: 30,
                    borderColor: 'light-gray',
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1
                    }}
                    placeholder = "Password:"
                    onChangeText={newText => newPassword = newText}
                />
                <Button
                    onPress={() => {
                        this.setState({ userType: "User", userName: newUsername });
                    }}
                    title={
                        "Create Account"
                    }
                />
                </View>
                
            )
        } else if(this.state.userType === "Guest" && this.state.newUserButton === "LogIn"){
            let newUsername, newPassword;
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
                    onChangeText={newText => newUsername = newText}
                />
                    
                <TextInput 
                    style = {{
                    height: 30,
                    borderColor: 'light-gray',
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1
                    }}
                    placeholder = "Password:"
                    onChangeText={newText => newPassword = newText}
                />
                <Button
                    onPress={() => {
                        if(this.checkUser(newUsername, newPassword) === "User"){
                            this.setState({ userType: "User", userName: newUsername });
                        } else if(this.checkUser(newUsername, newPassword) === "Admin"){
                            this.setState({ userType: "Admin", userName: newUsername });
                        }
                    }}
                    title={
                        "Log In"
                    }
                />
                </View>
                
            )
        } else if(this.state.userType === "User" || this.state.userType === "Admin"){
            return (
                <View style = {{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Wow, you're a user!
                    Your username is {this.state.userName}, and you are a {this.state.userType}!
                </Text>
                <Button
                    onPress={() => {
                        this.setState({ userType: "Guest", userName: false, newUserButton: false });
                    }}
                    title={
                        "Log Out"
                    }
                />
                </View>
            )
            } 
        
        
            
            
        
    }
}

export default CreateAccount;