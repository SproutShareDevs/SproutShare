import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, Alert, ImageBackground } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import UserPlantPreview from './UserPlantPreview';
import axios from 'axios';
import AddPlant from './editPlants/AddPlant';
import ArchiveGarden from './ArchiveGarden'

import * as SecureStore from 'expo-secure-store'
import ArchivePreview from './ArchivePreview';



function GardenFullView(props) {
    const [userPlantData, setUserPlantData] = useState([]);
    const [archiveModal, setArchiveModal] = useState(false);
    const [newGardenKey, setNewGardenKey] = useState(0);


    const fetchUserPlants = async () => {
        await axios.get(`${props.nodeServer}/userPlants/getByUser/${props.garden.garden_key}`, {
        }).then((response) => {
            setUserPlantData(response.data)
        }).catch(err => {
            console.log('Error: ', err);
        });
    }

    useEffect(() => {
        fetchUserPlants();
    }, [props.visible]);


    const deletePopup = () => {
        Alert.alert(
            "Delete Garden",
            "Delete this garden: " + props.garden.garden_name + "?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => deleteGarden()
                }
            ]
        )
    }

    const deleteGarden = async () => {
        await axios.delete(`${props.nodeServer}/gardens/delete/${props.garden.garden_key}`).then((response) => {
            props.onClose();
            console.log(response.data);
        }).catch((err) => {
            console.log("Error deleting garden: " + err);
        });
    }

    const deleteHandler = (userPlantKey) => {
        const filteredPlants = userPlantData.filter(item => item.user_plant_key !== userPlantKey);
        setUserPlantData(filteredPlants);
    }

    const addGarden = () => {
        const postGarden = async () => {
            await axios.post(`${props.nodeServer}/gardens/store`, {
                garden_name: props.garden.garden_name,
                user_key: props.garden.user_key,
                soil_key: props.garden.soil_key,
                light_level: props.garden.light_level,
                is_archived: false,
            }).then((response) => {
                setNewGardenKey(response.data.garden_key);
                console.log(response);
            }).catch(err => {
                console.log('Error adding new garden: ', err);
            });
        }

        const postUserPlant = async (userPlant) => {
            await axios.post(`${props.nodeServer}/userPlants/store`, {
                user_key: props.garden.user_key,
                plant_key: userPlant.plant_key,
                garden_key: newGardenKey,
                plant_qty: userPlant.plant_quantity
            }).then((response) => {
                console.log('added ', userPlant.plant_key);
            }).catch(err => {
                console.log('Error adding plant: ', err);
            });
        }

        postGarden();
        userPlantData.forEach(item => postUserPlant(item));
    }

    renderItem = ({ item }) => {
        if (props.garden.is_archived == false) {
            return <UserPlantPreview onDelete={fetchUserPlants} nodeServer={props.nodeServer} userPlant={item} />
        } else {
            return <ArchivePreview onDelete={deleteHandler} nodeServer={props.nodeServer} userPlant={item} />
        }
    }

    return (
        <>
            <Modal visible={props.visible} animationType="slide">
                <ImageBackground source={require("../../assets/MainBackground.png")} style={styles.backgroundImage}>
                    <View style={styles.container}>
                        <Button title='Close' onPress={props.onClose} />
                        <Button title='Delete Garden' onPress={deletePopup} />
                        {props.garden.is_archived == false &&
                            <>
                                <AddPlant onNewPlant={fetchUserPlants} nodeServer={props.nodeServer} garden={props.garden} />
                                <Button title='Archive Garden' onPress={() => setArchiveModal(true)} />
                            </>
                        }
                        {props.garden.is_archived == true &&
                            <>
                                <Button title='Recreate Garden' onPress={addGarden} />
                                <Text> Long press plants to remove them, then press "Recreate Garden" to make a new garden with the plants still in the list</Text>
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
                </ImageBackground>
            </Modal>
        </>
    );
}


export default GardenFullView;