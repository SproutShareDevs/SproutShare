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
            backgroundColor:'#87CEEB',
            borderRadius: 30,
            marginLeft: 5,
            marginRight: 5
            }}>
                <View style={{flexDirection: 'row'}}>
                <View style = {{flexDirection: 'column', marginLeft: 50, marginTop: 0}}>
                    <Text style={styles.weatherLocationText}>{weather.cityName} </Text>
                    <Text style={styles.weatherTempText}>{Math.round(weather.currentTemp)} F </Text>
                    </View>
                <View style ={{marginTop:10, marginBottom: 0}}>
                    <Image style ={{width:150, height:80}} source = {{uri:`http://openweathermap.org/img/wn/${weather.weatherIcon}@4x.png`}}/>
                </View>
                </View>
                <View style ={{flexDirection: 'row' , marginLeft:50}}>
                    <Text style={styles.weatherOtherText}>H: {Math.round(weather.maxTemp)} F</Text>
                    <Text style={styles.weatherOtherText}>L: {Math.round(weather.lowTemp)} F</Text>
                    <View style={{marginLeft: 50}}>
                    <Text style={styles.weatherOtherText}>{weather.weatherMain}</Text>
           </View></View>
           </Pressable>
    );
}

export default WeatherView;