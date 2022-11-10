import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native'
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
            soil_key: soilType,
            light_level: lightLevel,
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log('Error adding new garden: ', err);
        });
    };

    return (
        <>
        <TouchableOpacity
         onPress={() => toggleGardenModal(true)}
         style={styles.myGardenButtons}>
            <Text style ={styles.gardenButtonText}>Add a Garden</Text>
         </TouchableOpacity>
        
        <Modal visible={gardenModal} animationType="slide">
            <View style={styles.button}>

                <SoilQuestionnaire {...props} setSoilType={setSoilType}/>

                <ChooseSoilType {...props} setSoilType={setSoilType}/>

                <ChooseLightLevel {...props} setLightLevel={setLightLevel}/>

                <Button color='green' title='Create New Garden' onPress={()=> postGarden()}/>
            </View>
            <View style={styles.button}>
            <Button color='red' title='Close' onPress={() => toggleGardenModal(false)}/>
            </View>
        </Modal>
      </>
    );
}

function ChooseLightLevel(props){
    return(
        <>
        <Text>Select light level:</Text>
        <View style={{ flexDirection:"row", justifyContent: "center" }}>
            <Button title='0' onPress={()=> props.setLightLevel(0)}></Button>
            <Button title='1' onPress={()=> props.setLightLevel(1)}></Button>
            <Button title='2' onPress={()=> props.setLightLevel(2)}></Button>
            <Button title='3' onPress={()=> props.setLightLevel(3)}></Button>
            <Button title='4' onPress={()=> props.setLightLevel(4)}></Button>
            <Button title='5' onPress={()=> props.setLightLevel(5)}></Button>
            <Button title='6' onPress={()=> props.setLightLevel(6)}></Button>
            <Button title='7' onPress={()=> props.setLightLevel(7)}></Button>
            <Button title='8' onPress={()=> props.setLightLevel(8)}></Button>
            <Button title='9' onPress={()=> props.setLightLevel(9)}></Button>
        </View>
        </>
    )
}

function ChooseSoilType(props){
    return(
        <>
        <Text>Select soil type:</Text>
        <View style={{ flexDirection:"row", justifyContent: "center" }}>
                <Button title='Silt' onPress={()=> props.setSoilType(1)}></Button>
                <Button title='Clay' onPress={()=> props.setSoilType(2)}></Button>
                {/* These should be added when those types are added to the DB */}
                {/* <Button title='3' onPress={()=> setSoilType(3)}></Button>
                <Button title='4' onPress={()=> setSoilType(4)}></Button> */}
        </View>
        </>
    )
}

function SoilQuestionnaire(props){
    const [soilQuest, toggleSoilQuest] = useState(false);
    return(
        <>
        <Button title='Soil questionnaire' onPress={() => toggleSoilQuest(true)}/>
        <Modal visible={soilQuest} animationType="slide">
            <Text>Don't know your soil type? Fill out our questionnaire!</Text>
            <Text>Pick some wet soil and squish it. Does it feel...</Text>
            <View style={{ justifyContent: "center" }}>
                {/* Smooth and slimy is silt, and sticky and lumpy is clay. Source: https://www.dammannsgardenco.com/blog/how-to-identify-soil-types */}
                <Button title='Smooth and slimy?' onPress={()=> props.setSoilType(1)}></Button>
                <Button title='Sticky and lumpy?' onPress={()=> props.setSoilType(2)}></Button>
                {/* These should be added when those types are added to the DB. Gritty is sandy, and NOTA is loamy. */
                /*onPress={()=> setSoilType(3)}*/
                /*onPress={()=> setSoilType(4)}*/}
                <Button title='Gritty?'></Button>
                <Button title='None of the above?'></Button>
            </View>
            <Text>Questions taken from https://www.dammannsgardenco.com/blog/how-to-identify-soil-types. More information can also be found there.</Text>
            <Button color='red' title='Close' onPress={() => toggleSoilQuest(false)}/>
        </Modal>
        </>
    )
}
export default AddGarden;