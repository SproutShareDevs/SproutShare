import { useEffect, useReducer, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native'
import styles from "../../../styles/styles";
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

function WeatherView(props) {
    const [userZip, setUserZip] = useState('');
    const [weather, setWeather] = useState([]);
    
    


    const fetchUser = async () => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
            setUserZip(response.data.zip_code);
        }).catch(err => {
            console.log('Error: Could not access user', err);
        });
    }

    const fetchWeather = async () => {
        console.log(`${props.nodeServer}/weather/${userZip}`);
            await axios.get(`${props.nodeServer}/weather/${userZip}`).then((response) => {
                setWeather(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log('Error:  Could not access weather', err);
        });
    }

    
    useEffect(() => {
        fetchUser();
        if(userZip != '') {
            fetchWeather();
        }
    },[userZip]);

    return (
            <Pressable style={{flex: 1,
            flexDirection: 'row',
            backgroundColor:'#949699',
            padding:20,}}>
                <View style={{flex: 1}}>
                    <Image style ={{width:100, height:100}} source = {{uri:`http://openweathermap.org/img/wn/${weather.weatherIcon}@4x.png`}}/>
                    <Text style={{fontSize:24, marginLeft:15}}>{weather.weatherMain}</Text>
                </View>
                <View style={{flex:3}}>
                    <Text style={{fontSize:18}}>Location: {weather.cityName} </Text>
                    <Text style={{fontSize:18}}>Current Temperature: {weather.currentTemp} F </Text>
                    <Text style={{fontSize:18}}>High: {weather.maxTemp} F</Text>
                    <Text style={{fontSize:18}}>Low: {weather.lowTemp} F</Text>
                </View>
            </Pressable>
    );
}

export default WeatherView;