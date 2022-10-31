import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';
import AddPlant from './editPlants/AddPlant';

function GardenFullView(props) {
    const [userPlantData, setUserPlantData] = useState([]);

    useEffect(() => {
        const fetchUserPlants = async () => {
            await axios.get(`${props.nodeServer}/userPlants`).then((response) => {
                setUserPlantData(response.data)
            }).catch(err => {
                console.log('Error fetching user plants: ', err);
            });
        }

        fetchUserPlants();
    },[props.visible]);
    
    renderItem = ({item}) => {
        if(item.garden_key == props.garden.garden_key) {
            return <UserPlantPreview nodeServer ={props.nodeServer} userPlant = {item}/>
        }
    }

    return (
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <Button title='Close' onPress={props.onClose}/>
                <AddPlant nodeServer = {props.nodeServer} garden ={props.garden}/>
                <View style={styles.listBottomMargin}>
                  <FlatList
                    data = {userPlantData}
                    renderItem={renderItem}
                    keyExtractor={item => item.user_plant_key}
                  />
                </View>
            </View>
        </Modal>
      </>
    );
}

export default GardenFullView;