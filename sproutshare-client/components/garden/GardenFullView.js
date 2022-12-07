import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';
import AddPlant from './editPlants/AddPlant';
import ArchiveGarden from './ArchiveGarden'

import * as SecureStore from 'expo-secure-store'



function GardenFullView(props) {
    const [userPlantData, setUserPlantData] = useState([]);
    const [archiveModal, setArchiveModal] = useState(false);


    const fetchUserPlants = async () => {
        axios.get(`${props.nodeServer}/userPlants/getByUser/${props.garden.garden_key}`, {
        }).then((response) => {
            setUserPlantData(response.data)
        }).catch(err => {
            console.log('Error: ', err);
        });
    }

    useEffect(() => {
        fetchUserPlants();
    }, [props.visible]);


    renderItem = ({ item }) => {
        return <UserPlantPreview onDelete={fetchUserPlants} nodeServer={props.nodeServer} userPlant={item} />
    }


    return (
        <>
            <Modal visible={props.visible} animationType="slide">
                <View style={styles.container}>
                    <Button title='Close' onPress={props.onClose} />
                    {props.garden.is_archived == false &&
                        <>
                            <AddPlant onNewPlant={fetchUserPlants} nodeServer={props.nodeServer} garden={props.garden} />
                            <Button title='Archive Garden' onPress={() => setArchiveModal(true)} />
                        </>
                    }

                    <View style={styles.listBottomMargin}>
                        <FlatList
                            data={userPlantData}
                            renderItem={renderItem}
                            keyExtractor={item => item.user_plant_key}
                            contentInset={{ right: 10, top: 0, left: 10, bottom: 20 }}
                        />
                    </View>

                    <ArchiveGarden nodeServer={props.nodeServer} visible={archiveModal} userPlants={userPlantData}
                        onClose={() => { setArchiveModal(false) }} doneRating={() => props.archiveGarden(props.garden.garden_key)} />
                </View>
            </Modal>
        </>
    );
}


export default GardenFullView;