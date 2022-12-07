import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, Alert, ImageBackground } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';


function UserPlantFullView(props) {


    deleteButtonHandler = async () => {
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
                <ImageBackground source={require("../../assets/MainBackground.png")} style={styles.backgroundImage}>
                    <View style={styles.containerCenter}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.commonName}>Plant Name: {props.plant.common_name}</Text>
                            <Text style={styles.latinName}>Latin Name: {props.plant.latin_name}</Text>
                        </View>

                        <Image
                            style={styles.mediumImage}
                            source={{ uri: props.plant.img }}
                        />
                        <Text style={styles.title}> Quantity Planted: {props.userPlant.plant_qty} </Text>
                        <Text style={styles.title}> Date Planted: {props.formattedPlantingDate}</Text>
                        <Button title='Delete' onPress={deleteButtonHandler} />
                        <Button title='Close' onPress={props.onClose} />
                    </View>
                </ImageBackground>
            </Modal>
        </>
    );

}


export default UserPlantFullView;