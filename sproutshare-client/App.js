// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import Exchange from './components/Exchange.js';
import PlantWiki from './components/PlantWiki.js';
import CommunityFeed from './components/CommunityFeed.js';
import UserGarden from './components/UserGarden.js';


// React Native Navigation Docs- https://reactnative.dev/docs/navigation
const Tab = createBottomTabNavigator();

// Everytime a new localtunnel session is started, this link MUST be changed to match where the https server is located
const nodeServer = 'https://big-spiders-lay-68-0-34-101.loca.lt';

export default class App extends React.Component {

  render() {
    return (
        <NavigationContainer>
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
                }
    
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#228b22',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            
            
            <Tab.Screen name={'UserGarden'}>
                  {props => <UserGarden {...props} nodeServer={nodeServer}/>}
            </Tab.Screen>

            <Tab.Screen name="CommunityFeed" component={CommunityFeed} />
            <Tab.Screen name="PlantWiki" component={PlantWiki} />
            <Tab.Screen name="Exchange" component={Exchange} />

          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
    );
  };
};

