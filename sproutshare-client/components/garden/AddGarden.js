import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

function AddGarden(props) {
    const [gardenModal, toggleGardenModal] = useState(false);
    const [lightLevel, setLightLevel] = useState(10);
    const [userKey, setUserKey] = useState();
    const [soilType, setSoilType] = useState(0);
  
    useEffect(() => {
        const fetchUserKey = async () => {
            let accessToken = await SecureStore.getItemAsync('AccessToken');
            await axios.get(`${props.nodeServer}/user/${accessToken}`).then((response) => {
                setUserKey(response.data.user_key)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }
        fetchUserKey();
    }, []);

    async function postGarden () {
        await axios.post(`${props.nodeServer}/gardens/store`, {
            user_key: userKey,
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log('Error: ', err);
        });
    };

    return (
        <>
        <Button color='#228b22' title='Add Garden' onPress={() => toggleGardenModal(true)}/>
        <Modal visible={gardenModal} animationType="slide">
            <View style={styles.button}>
                <Button color='green' title='Create New Garden' onPress={()=> postGarden()}/>
            </View>
            <View style={styles.button}>
            <Button color='red' title='Close' onPress={() => toggleGardenModal(false)}/>
            </View>
        </Modal>
      </>
    );
}
export default AddGarden;