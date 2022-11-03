import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';


function UserPlantFullView(props) {


    updateQuality = async (quality) => {
        await axios.put(`${props.nodeServer}/userPlants/updatequality/${props.userPlant.user_plant_key}`, {
            plant_quality: quality
        }).then((response) => {
            console.log(response.data);
        }).catch(err => {
            console.log('Error updating plant quality: ', err);
        });
    }

    updateDifficulty = async (difficulty) => {
        await axios.put(`${props.nodeServer}/userPlants/updatedifficulty/${props.userPlant.user_plant_key}`, {
            plant_difficulty: difficulty
        }).then((response) => {
            console.log(response.data);
        }).catch(err => {
            console.log('Error updating plant difficulty: ', err);
        });
    }

    deleteButtonHandler = async() => {
        await Alert.alert(
            "Delete Plant",
            "Are you sure you want to remove this plant from your garden?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Plant deletion cancellled")
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        axios.delete(`${props.nodeServer}/userPlants/delete/${props.userPlant.user_plant_key}`).then((response) => {
                            console.log(`${props.nodeServer}/userPlants/delete/${props.userPlant.user_plant_key}`);
                            console.log(response.data);
                            props.onDelete();
                        }).catch((err) => {
                            console.log("Error deleting plant: " + err);
                        });
                    }
                }
            ]
        );
    }

    return (
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.containerCenter}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.commonName}>Plant Name: {props.plant.common_name}</Text>
                    <Text style={styles.latinName}>Latin Name: {props.plant.latin_name}</Text>
                </View>
                
                <Image
                    style={styles.mediumImage}
                    source={{uri: props.plant.img }}
                />
                <Text style={styles.title}> Quantity Planted: {props.userPlant.plant_qty} </Text>
                <Text style={styles.title}> Date Planted: {props.formattedPlantingDate}</Text>
                <RatePlant updateQuality={updateQuality} updateDifficulty={updateDifficulty} />
                <Button title='Delete' onPress={deleteButtonHandler}/>
                <Button title='Close' onPress={props.onClose}/>
            </View>
        </Modal>
      </>
    );
    
}

function RatePlant(props){
    return(
        <View style={{ justifyContent: "center" }}>
            <Text>How well does this plant grow?</Text>
            <FiveButtons {...props} buttonPressed={props.updateQuality} />
            <Text>How difficult is it to grow this plant?</Text>
            <FiveButtons {...props} buttonPressed={props.updateDifficulty} />
        </View>
    )
}

function FiveButtons(props){
    return(
        <View style={{ flexDirection:"row", justifyContent: "center" }}>
            <Button title='1' onPress={()=> props.buttonPressed(1)}></Button>
            <Button title='2' onPress={()=> props.buttonPressed(2)}></Button>
            <Button title='3' onPress={()=> props.buttonPressed(3)}></Button>
            <Button title='4' onPress={()=> props.buttonPressed(4)}></Button>
            <Button title='5' onPress={()=> props.buttonPressed(5)}></Button>
        </View>
    )
}

export default UserPlantFullView;