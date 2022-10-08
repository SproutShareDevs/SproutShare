const nodeServer = 'https://nine-shrimps-hide-68-10-167-72.loca.lt';
// Everytime a new localtunnel session is started, this link MUST be changed to match where the https server is located
// React / Expo Imports
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Button, Text, TextInput } from 'react-native';

// Navbar Imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

// Local Component Imports
//import { nodeServer } from './NewNodeServer.js';
import Exchange from "./components/Exchange.js";
import PlantWiki from './components/PlantWiki.js';
import CommunityFeed from './components/CommunityFeed.js';
import UserGarden from './components/UserGarden.js';
import CreateAccount from './components/CreateAccount.js';


// React Native Navigation Docs- https://reactnative.dev/docs/navigation
const Tab = createBottomTabNavigator();

// Everytime a new localtunnel session is started, this link MUST be changed to match where the https server is located
//const nodeServer = 'https://old-aliens-leave-68-10-167-72.loca.lt';


export default class App extends React.Component {
  state = {userType:"Guest", userName:false, user_ID:false, newUserButton: false};
  
  checkUser = (myUsername, myPassword) => {
    if (myUsername === "default" && myPassword === "default")
        return "User";
    if (myUsername === "admin" && myPassword === "admin")
        return "Admin";
    return false;
  }

  logOut = () => {
    this.setState({userType:"Guest"});
    this.setState({userName:false});
    this.setState({user_ID:false});
    this.setState({newUserButton: false});
  }

  render() {
    if (this.state.userName != false){
      return (
        <>
        <NavigationContainer>
          {/* Bottom tab icon styling. More info on how to manipulate this specific navigator: https://reactnavigation.org/docs/bottom-tab-navigator/ */}
          <Tab.Navigator 
            initialRouteName='UserGarden'

            
            
            screenOptions={({ route }) => ({
              
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'UserGarden') {
                  iconName = focused ? 'ios-leaf' : 'ios-leaf-outline';
                } else if (route.name === 'CommunityFeed') {
                  iconName = focused ? 'ios-people' : 'ios-people-outline';
                } else if (route.name === 'PlantWiki') {
                  iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                } else if (route.name === 'Exchange') {
                  iconName = focused ? 'ios-pricetag' : 'ios-pricetag-outline';
                } else if (route.name === 'CreateAccount') {
                  iconName = focused ? 'ios-person-add' : 'ios-person-add-outline';
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#228b22',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            
            {/* In order for this navigation to work, the node server url must be passed down to all child screens to utilize the server calls in all of them */}
            <Tab.Screen name={'UserGarden'}>
                  {props => <UserGarden {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'CommunityFeed'}>
                  {props => <CommunityFeed {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'PlantWiki'}>
                  {props => <PlantWiki {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'Exchange'}>
                  {props => <Exchange {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'CreateAccount'}>
                  {props => <CreateAccount {...props} nodeServer={nodeServer} 
                    userName={this.state.userName} user_ID={this.state.user_ID} userType={this.state.userType}
                    //logMeOut={this.logOut()}
                    />}
            </Tab.Screen>
            {/* Alt Syntax if addtional props dont need to be passed down: <Tab.Screen name="PlantWiki" component={PlantWiki} />*/} 
          </Tab.Navigator>
          {/* Colors system status bar */}
          
        </NavigationContainer>
        </>
        
      );
    } else {
      if(this.state.userType === "Guest" && this.state.newUserButton === false){
        return(
            <View style = {{
                flex: 1,
                justifyContent: "center",
                //alignItems: "center"
            }}>
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
            <Button
                onPress={() => {
                    this.setState({ userType: "User", userName: "default_user" });
                }}
                title={
                    "Skip login: User"
                }
            />
            <Button
                onPress={() => {
                    this.setState({ userType: "Admin", userName: "default_admin" });
                }}
                title={
                    "Skip login: Admin"
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
    
};



