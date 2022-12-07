import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';
import RatePlant from './RatePlant';


function ArchiveGarden(props) {

    updateQuality = async (userPlantKey, quality) => {
        await axios.put(`${props.nodeServer}/userPlants/updatequality/${userPlantKey}`, {
            plant_quality: quality
        }).then((response) => {
            console.log(response.data);
        }).catch(err => {
            console.log('Error updating plant quality: ', err);
        });
    }

    updateDifficulty = async (userPlantKey, difficulty) => {
        await axios.put(`${props.nodeServer}/userPlants/updatedifficulty/${userPlantKey}`, {
            plant_difficulty: difficulty
        }).then((response) => {
            console.log(response.data);
        }).catch(err => {
            console.log('Error updating plant difficulty: ', err);
        });
    }

    renderItem = (item) => {
        if (item.item.plant_difficulty == null || item.item.plant_quality == null) {
            return (
                <>
                    <RatePlant nodeServer={props.nodeServer} plantKey={item.item.plant_key} plantingDate = {item.item.plantingDate} userPlantKey={item.item.user_plant_key} 
                    updateQuality={updateQuality} updateDifficulty={updateDifficulty} />
                </>
            )
        }
    }

    return (
        <>
            <Modal visible={props.visible} animationType="slide">
                <View style={styles.container}>
                    <Button title='Close' onPress={props.onClose} />
                    <Button title='Done Rating' onPress={props.doneRating} />
                    <Text>Please rate the success and difficulty of the plants in your garden. When you're done, press the Done Rating button, or press Close to cancel archiving</Text>
                    <View style={styles.listBottomMargin}>
                        <FlatList
                            data={props.userPlants}
                            renderItem={renderItem}
                            keyExtractor={item => item.user_plant_key}
                            contentInset={{ right: 10, top: 0, left: 10, bottom: 20 }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}



export default ArchiveGarden;