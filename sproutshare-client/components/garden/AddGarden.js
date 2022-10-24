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
    const [soilQuest, toggleSoilQuest] = useState(false);
  
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
            soil_key: soilType,
            light_level: lightLevel,
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

                {/* Replace this with something better, someday */}
                <Button title='Soil questionnaire' onPress={() => toggleSoilQuest(true)}/>
                <Modal visible={soilQuest} animationType="slide">
                    <Text>Don't know your soil type? Fill out our questionnaire!</Text>
                    <View style={{ flexDirection:"row", justifyContent: "center" }}>
                            <Button title='1' onPress={()=> setSoilType(1)}></Button>
                            <Button title='2' onPress={()=> setSoilType(2)}></Button>
                            {/* These should be added when those types are added to the DB */}
                            {/* <Button title='3' onPress={()=> setSoilType(3)}></Button>
                            <Button title='4' onPress={()=> setSoilType(4)}></Button> */}
                    </View>
                    <Button color='red' title='Close' onPress={() => toggleSoilQuest(false)}/>
                </Modal>

                <Text>Select soil type:</Text>
                <View style={{ flexDirection:"row", justifyContent: "center" }}>
                        <Button title='1' onPress={()=> setSoilType(1)}></Button>
                        <Button title='2' onPress={()=> setSoilType(2)}></Button>
                        {/* These should be added when those types are added to the DB */}
                        {/* <Button title='3' onPress={()=> setSoilType(3)}></Button>
                        <Button title='4' onPress={()=> setSoilType(4)}></Button> */}
                </View>

                <Text>Select light level:</Text>
                <View style={{ flexDirection:"row", justifyContent: "center" }}>
                        <Button title='0' onPress={()=> setLightLevel(0)}></Button>
                        <Button title='1' onPress={()=> setLightLevel(1)}></Button>
                        <Button title='2' onPress={()=> setLightLevel(2)}></Button>
                        <Button title='3' onPress={()=> setLightLevel(3)}></Button>
                        <Button title='4' onPress={()=> setLightLevel(4)}></Button>
                        <Button title='5' onPress={()=> setLightLevel(5)}></Button>
                        <Button title='6' onPress={()=> setLightLevel(6)}></Button>
                        <Button title='7' onPress={()=> setLightLevel(7)}></Button>
                        <Button title='8' onPress={()=> setLightLevel(8)}></Button>
                        <Button title='9' onPress={()=> setLightLevel(9)}></Button>
                </View>

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