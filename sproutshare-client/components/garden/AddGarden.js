import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity, ImageBackground } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

function AddGarden(props) {
    const [gardenModal, toggleGardenModal] = useState(false);
    const [lightLevel, setLightLevel] = useState(10);
    const [userKey, setUserKey] = useState();
    const [soilType, setSoilType] = useState(0);
    const [gardenName, setGardenName] = useState('Garden');

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

    async function postGarden() {
        await axios.post(`${props.nodeServer}/gardens/store`, {
            garden_name: gardenName,
            user_key: userKey,
            soil_key: soilType,
            light_level: lightLevel,
            is_archived: false,
        }).then((response) => {
            console.log(response);
            toggleGardenModal(false);
        }).catch(err => {
            console.log('Error adding new garden: ', err);
        });
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => toggleGardenModal(true)}
                style={styles.myGardenButtons}>
                <Text style={styles.gardenButtonText}>Add a Garden</Text>
            </TouchableOpacity>

            <Modal visible={gardenModal} animationType="slide">
            <ImageBackground source={require("./../../assets/MainBackground.png")} style={styles.backgroundImage}>
                <View style={styles.button}>
                
                    <SoilQuestionnaire {...props} setSoilType={setSoilType} soilType={soilType} />

                    <ChooseSoilType {...props} setSoilType={setSoilType} soilType={soilType} />
                    <Text style={{fontSize:15,marginLeft:125, fontWeight:'bold'}}>Current soil type: {soilType}</Text>

                    <ChooseLightLevel {...props} setLightLevel={setLightLevel} />
                    <Text style={{fontSize:15, marginTop:10,marginLeft:125, fontWeight:'bold'}}>Current light level: {lightLevel}</Text>

                    <>
                        <Text style={{fontSize:18, fontWeight:'bold', marginTop:10}}> Garden name:</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TextInput style={styles.textInput} onChangeText={setGardenName} placeholder={'Choose garden name'} />
                        </View>
                    </>
                <TouchableOpacity
                    onPress={() => postGarden()} 
                    style={[styles.newGarden, {backgroundColor: '#5ab07d'}]}>
                    <Text style={[styles.buttonText]}>Create New Garden</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => toggleGardenModal(false)} 
                    style={[styles.newGarden, {backgroundColor: '#D4CD68'}]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                </View>
            </ImageBackground>
            </Modal>
        </>
    );
}

function ChooseLightLevel(props) {
    return (
        <>
            <Text style={{marginTop:10, marginBottom:10,fontSize:18, fontWeight:'bold'}}>Select light level:</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", marginRight:5 }}>
                <Button color='#FFF26C' title='0' onPress={() => props.setLightLevel(0)}></Button>
                <Button color='#FFF05A' title='1' onPress={() => props.setLightLevel(1)}></Button>
                <Button color='#FFEF4B' title='2' onPress={() => props.setLightLevel(2)}></Button>
                <Button color='#FFEE3A' title='3' onPress={() => props.setLightLevel(3)}></Button>
                <Button color='#FFED2B' title='4' onPress={() => props.setLightLevel(4)}></Button>
                <Button color='#FFE11F' title='5' onPress={() => props.setLightLevel(5)}></Button>
                <Button color='#F9D908' title='6' onPress={() => props.setLightLevel(6)}></Button>
                <Button color='#F9CD08' title='7' onPress={() => props.setLightLevel(7)}></Button>
                <Button color='#FFC80E' title='8' onPress={() => props.setLightLevel(8)}></Button>
                <Button color='#FDC403' title='9' onPress={() => props.setLightLevel(9)}></Button>
            </View>
        </>
    )
}

function ChooseSoilType(props) {
    return (
        <>
            <Text style={{fontSize:18, fontWeight: 'bold'}}>Select soil type:</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity style={styles.soilButton}
                    onPress={() => props.setSoilType(1)}>
                    <ImageBackground source={require("./../../assets/silty.png")} style={styles.buttonImage}>
                    </ImageBackground>
                    <Text style={styles.gardenButtonText}>Silty</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.soilButton}
                    onPress={() => props.setSoilType(2)}>
                    <ImageBackground source={require("./../../assets/clay.png")} style={styles.buttonImage}>
                    </ImageBackground>
                    <Text style={styles.gardenButtonText}>Clay</Text>
                  </TouchableOpacity>
                   {/* These should be added when those types are added to the DB */}
                  <TouchableOpacity style={styles.soilButton}
                    onPress={()=> props.setSoilType(3)}>
                    <ImageBackground source={require("./../../assets/sand.png")} style={styles.buttonImage}>
                    </ImageBackground>
                    <Text style={styles.gardenButtonText}>Sandy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.soilButton}
                    onPress={()=> props.setSoilType(4)}>
                    <ImageBackground source={require("./../../assets/loam.png")} style={styles.buttonImage}>
                    </ImageBackground>
                    <Text style={styles.gardenButtonText}>Loamy</Text>
                  </TouchableOpacity>
            </View>
        </>
    )
}

function SoilQuestionnaire(props) {
    const [soilQuest, toggleSoilQuest] = useState(false);
    return (
        <>
            <Text style={styles.soilQ}> Dont know your soil type? Take this Quiz.</Text>
            <TouchableOpacity
                    onPress={() => toggleSoilQuest(true)}
                    style={[styles.quizButton, {backgroundColor: '#A5B8A1'}]}>
                    <Text style={styles.buttonText}>soil questionare</Text>
                  </TouchableOpacity>
                  
            <Modal visible={soilQuest} animationType="slide">
                <Text>Don't know your soil type? Fill out our questionnaire!</Text>
                <Text>Pick some wet soil and squish it. Does it feel...</Text>
                <View style={{ justifyContent: "center" }}>
                    {/* Smooth and slimy is silt, and sticky and lumpy is clay. Source: https://www.dammannsgardenco.com/blog/how-to-identify-soil-types */}
                    <Button title='Smooth and slimy?' onPress={() => props.setSoilType(1)}></Button>
                    <Button title='Sticky and lumpy?' onPress={() => props.setSoilType(2)}></Button>
                    {/* These should be added when those types are added to the DB. Gritty is sandy, and NOTA is loamy. */}
                    <Button title='Gritty?' onPress={()=> props.setSoilType(3)}></Button>
                    <Button title='None of the above?' onPress={()=> props.setSoilType(4)}></Button>
                </View>
                <Text>Current soil type: {props.soilType}</Text>
                <Text>Questions taken from https://www.dammannsgardenco.com/blog/how-to-identify-soil-types. More information can also be found there.</Text>
                <Button color='red' title='Close' onPress={() => toggleSoilQuest(false)} />
            </Modal>
        </>
    )
}
export default AddGarden;