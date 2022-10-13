import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';
import AddPlant from './AddPlant';

function GardenFullView(props) {
    const [userPlantData, setUserPlantData] = useState([]);
    const [addPlantVisible, setAddPlantVisible] = useState([]);

    useEffect(() => {
        const fetchUserPlants = async () => {
            await axios.get(`${props.nodeServer}/userPlants`).then((response) => {
                setUserPlantData(response.data)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }

        fetchUserPlants();
    },[]);
    
    renderItem = ({item}) => {
        if(item.garden_key == props.garden.garden_key) {
            return <UserPlantPreview nodeServer ={props.nodeServer} userPlant = {item}/>
        }
    }

    return (
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.containerCenter}>
                <View style={styles.listBottomMargin}>
                  <FlatList
                    data = {userPlantData}
                    renderItem={renderItem}
                    keyExtractor={item => item.user_plant_key}
                  />
                  <Button title='Add plant' onPress={() => setAddPlantVisible(true)}/>
                  <Button title='Close' onPress={props.onClose}/>
                  <AddPlant nodeServer = {props.nodeServer} visible = {addPlantVisible} garden ={props.garden} onClose = {() => setAddPlantVisible(false)}/>
                </View>
            </View>
        </Modal>
      </>
    );
}

export default GardenFullView;