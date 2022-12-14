import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity, ImageBackground } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

function SimulateTime(props) {
    const [timeModal, toggleTimeModal] = useState(false);
    const [userKey, setUserKey] = useState();
    const [rainAmount, setRain] = useState('');
    const [days, setDays] = useState('');

    function rainInputHandler(enteredRainAmount) {
        setRain(enteredRainAmount);
    }

    function dayInputHandler(enteredDays) {
        setDays(enteredDays);
    }


    async function advanceTime() {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        await axios.put(`${props.nodeServer}/userplants/advancedays`, {
            days: days,
            accessToken: accessToken,
            rain_amount: rainAmount
        },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((response) => {
                console.log(response);

            }).catch(err => {
                console.log('Error advancing time: ', err);
                console.log("Token: " + accessToken);
                console.log("Days: " + days);
                console.log("Rain amount: " + rainAmount);
                console.log(`${props.nodeServer}/userplants/advancedays`);
            });
        props.rerenderGarden();
        props.repushNotifications();
        toggleTimeModal(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => toggleTimeModal(true)}
                style={styles.myGardenButtons}>
                <Text style={styles.gardenButtonText}>Advance Time</Text>
            </TouchableOpacity>

            <Modal visible={timeModal} animationType="slide">
                <ImageBackground source={require("../../assets/MainBackground.png")} style={styles.backgroundImage}>
                    <TextInput style={styles.textInput}
                        placeholder='Rain Amount'
                        onChangeText={rainInputHandler}
                        value={rainAmount}
                    />
                    <TextInput style={styles.textInput}
                        placeholder='Days Amount'
                        onChangeText={dayInputHandler}
                        value={days}
                    />


                    <View style={styles.button}>
                        <Button color='green' title='Advance Time' onPress={() => advanceTime()} />
                    </View>
                    <View style={styles.button}>
                        <Button color='red' title='Close' onPress={() => toggleTimeModal(false)} />
                    </View>
                    </ImageBackground>
            </Modal>
        </>
    );
}




export default SimulateTime;