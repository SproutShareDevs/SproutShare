import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';

function GardenFullView(props) {
    const [userPlantData, setUserPlantData] = useState([]);

    useEffect(() => {
        const fetchUserPlants = async () => {
            await axios.get(`${props.nodeServer}/userPlants`).then((response) => {
                setUserPlantData(response.data)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }

        fetchUserPlants();
    });
    
    renderItem = ({item}) => {
        if(item.garden_ID == props.garden.garden_ID) {
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
                    keyExtractor={item => item.user_plant_ID}
                  />
                </View>
                <Button title='Close' onPress={props.onClose}/>
            </View>
        </Modal>
      </>
    );
}

export default GardenFullView;