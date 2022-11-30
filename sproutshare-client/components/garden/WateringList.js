import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
//import UserPlantPreview from './UserPlantPreview';
import PlantToBeWatered from './PlantToBeWatered';
import axios from 'axios';
//import AddPlant from './editPlants/AddPlant';


import * as SecureStore from 'expo-secure-store'


function WateringList(props) {
    const [plantsToBeWatered, setPlantsToBeWatered] = useState([]);


    const fetchPlantsToBeWatered = async () => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        axios.get(`${props.nodeServer}/userPlants/water/${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setPlantsToBeWatered(response.data)
        }).catch(err => {
            console.log('Error: ', err);
        });
    }

    useEffect(() => {
        fetchPlantsToBeWatered();
    }, [props.update]);


    renderItem = ({ item }) => {
        return <PlantToBeWatered onDelete={fetchPlantsToBeWatered} nodeServer ={props.nodeServer} userPlant = {item}/>
        /*
        if(item.garden_key == props.garden.garden_key) {
            return <UserPlantPreview onDelete={fetchUserPlants} nodeServer ={props.nodeServer} userPlant = {item}/>
        }
        */
    }

    return (
            <View style={styles.waterContainer}>
                
                <Text style={styles.gardenButtonText}>Watering Checklist</Text>

                    <FlatList
                        data={plantsToBeWatered}
                        renderItem={renderItem}
                        keyExtractor={item => item.user_plant_key}
                        contentInset={{ right: 10, top: 0, left: 10, bottom: 20 }}
                    />

            </View>
        
    );
}


export default WateringList;