
// React / Expo Imports
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// Navbar Imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

// Local Component Imports
import Exchange from "./components/Exchange.js";
import PlantWiki from './components/PlantWiki.js';
import CommunityFeed from './components/CommunityFeed.js';
import UserGarden from './components/UserGarden.js';
import CreateAccount from './components/CreateAccount.js';
import LogInScreen from './components/account/LogInScreen.js';

// Dotenv
import {NODE_SERVER} from "@env"


// Define a .env file in the root directory of SproutShare consisting of one environment variable:
// NODE_SERVER="YourNodeServer"
const nodeServer = NODE_SERVER;
console.log("NODE_SERVER: " + NODE_SERVER);


// React Native Navigation Docs- https://reactnative.dev/docs/navigation
const Tab = createBottomTabNavigator();


async function saveAccessToken(value) {
    await SecureStore.setItemAsync('AccessToken', value);
}

async function deleteAccessToken() {
    await SecureStore.deleteItemAsync('AccessToken');
    console.log("Deleted access token");
}
  
async function getCurrentAccessToken() {
    let result = await SecureStore.getItemAsync('AccessToken');
    if (result) {
      alert("🔐 Here's your access token 🔐 \n" + result);
    } else {
      alert('No access token in storage');
    }
}

export default class App extends React.Component {
    componentDidMount() {
        deleteAccessToken();
    }

  render() {
      return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='LogInTop'
                screenOptions={{tabBarShowLabel: false, headerShown: false}}  >
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name="Home" component={HomeView} />
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name="LogInTop" component={LogInTop} />
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name={'LogInScreen'}>
                    {props => <LogInScreen {...props} saveToken={saveAccessToken} nodeServer={nodeServer}/>}
                </Tab.Screen>
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name="CreateAccountScreen" component={CreateAccountScreen} />
            </Tab.Navigator>
        </NavigationContainer>
      );
    };
};

// The below functions need to be changed to work with the databases.



// A function that checks if a user is one of two hardcoded accounts


// The screen where users can input their own username and password to make a new account
function CreateAccountScreen({ navigation }) {
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
            onPress={() => navigation.navigate('Home', {
                userName: newUsername, userType: 'User'
            })}
            title={
                "Create Account"
            }
        />
        </View>
        
    )
}

// The main view of the app as it was before, showing the tabs on the bottom
function HomeView({ navigation, route }) {
    const { userName, userType, user_ID } = route.params;

    return(
        <View style = {{
            flex: 1,
            justifyContent: "center"
        }}>
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
                    userName={userName} user_ID={user_ID} userType={userType}
                    />}
            </Tab.Screen>
            {/* Alt Syntax if addtional props dont need to be passed down: <Tab.Screen name="PlantWiki" component={PlantWiki} />*/} 
        </Tab.Navigator>
        {/* Colors system status bar */}
        </View>
    )

}

// The screen with buttons for creating an account, logging in, and bypassing them
function LogInTop({ navigation }) {
    return(
        <View style = {{
            flex: 1,
            justifyContent: "center",
        }}>
        <Button
            onPress={() => navigation.navigate('CreateAccountScreen')}
            title={
                "Create Account"
            }
        />
        <Button
            onPress={() => navigation.navigate('LogInScreen')}
            title={
                "Log In"
            }
        />
        {/* Skips the login process */}
        <Button
            onPress={() => navigation.navigate('Home', {
                userName: 'default_user', userType: 'User'
            })}
            title={
                "Skip login: User"
            }
        />
        {/* Skips the login process */}
        <Button
            onPress={() => navigation.navigate('Home', {
                userName: 'default_admin', userType: 'Admin'
            })}
            title={
                "Skip login: Admin"
            }
        />
        <Button
        title={"Retrieve Token"}
            onPress={getCurrentAccessToken}
        />
        </View>
    )
}

