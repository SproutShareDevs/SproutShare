
// React / Expo Imports
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, Button, Text, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
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
import AccountManagement from './components/AccountManagement.js';
import LogInScreen from './components/account/LogInScreen.js';
import CreateAccountScreen from './components/account/CreateAccountScreen.js';

// Dotenv
import {NODE_SERVER} from "@env"
import styles from './styles/styles.js';
import { color } from 'react-native-reanimated';


// Define a .env file in the root directory of SproutShare consisting of one environment variable:
// NODE_SERVER="YourNodeServer"
const nodeServer = NODE_SERVER;
console.log("NODE_SERVER: " + NODE_SERVER);


// React Native Navigation Docs- https://reactnative.dev/docs/navigation
const Tab = createBottomTabNavigator();


async function saveAccessToken(value) {
    await SecureStore.setItemAsync('AccessToken', value);
}



async function getCurrentAccessToken() {
    let result = await SecureStore.getItemAsync('AccessToken');
    if (result) {
        console.log(result);
        return result;
    } else {
      alert('No access token in storage');
    }
}

export default class App extends React.Component {

  render() {
      return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='LogInTop'
                screenOptions={{tabBarShowLabel: false, headerShown: false}}  >
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name={'Home'}>
                    {props => <HomeView {...props}/>}
                </Tab.Screen>
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name="LogInTop" component={LogInTop} />
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name={'LogInScreen'}>
                    {props => <LogInScreen {...props} saveToken={saveAccessToken} nodeServer={nodeServer}/>}
                </Tab.Screen>
                <Tab.Screen options={{tabBarStyle:{display:'none'}}} name={'CreateAccountScreen'}>
                    {props => <CreateAccountScreen {...props} saveToken={saveAccessToken} nodeServer={nodeServer}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
      );
    };
};

// The below functions need to be changed to work with the databases.



// A function that checks if a user is one of two hardcoded accounts


// The screen where users can input their own username and password to make a new account

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

            backBehavior='history'
            
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
                } else if (route.name === 'AccountManagement') {
                iconName = focused ? 'ios-person-add' : 'ios-person-add-outline';
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green', //changes icon color not background
            tabBarInactiveTintColor: 'dark gray',
            tabBarActiveBackgroundColor: '#A5B8A1',
            tabBarInactiveBackgroundColor: '#A5B8A1'
    
            })}
        >
            
            {/* In order for this navigation to work, the node server url must be passed down to all child screens to utilize the server calls in all of them */}
            <Tab.Screen name={'UserGarden'} options={{unmountOnBlur: true, header: ()=>null}}>
                {props => <UserGarden {...props} userType={userType}  nodeServer={nodeServer}/>}
                
            </Tab.Screen>

            <Tab.Screen  name={'CommunityFeed'} options={{unmountOnBlur: true,  header: ()=>null}}>
                {props => <CommunityFeed {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'PlantWiki'} options={{unmountOnBlur: true,  header: ()=>null}}>
                {props => <PlantWiki {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'Exchange'} options={{unmountOnBlur: true,  header: ()=>null}}>
                {props => <Exchange {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name={'AccountManagement'} options={{unmountOnBlur: true,  header: ()=>null}}>
                {props => <AccountManagement {...props} nodeServer={nodeServer} 
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
        <View style = {{flex: 1}}>
        <ImageBackground source={require("./assets/homepage.png")} style={styles.backgroundImage}>
        
        <Image source = {require("./assets/logo.png")} style={styles.logoImage}/>
        <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('CreateAccountScreen')}
            style={styles.roundButton1}>
            <Text style ={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('LogInScreen')}
            style={styles.roundButton1}>
            <Text style ={styles.buttonText}>Log In</Text>
        </TouchableOpacity></View>
        <TouchableOpacity
             onPress={() => navigation.navigate('Home', {
                userName: 'default_admin', userType: 'Admin'
            })}
            style={styles.roundButton2}>
            <Text style ={styles.buttonText}>Skip Login: Admin</Text>
            </TouchableOpacity>
        
        
        </ImageBackground>
        </View>
    )
}

