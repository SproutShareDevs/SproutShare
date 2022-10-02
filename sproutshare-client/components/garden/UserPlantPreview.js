import { useState, useEffect } from "react";
import {StyleSheet, View, Text, Pressable, Image } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import axios from 'axios';

function UserPlantPreview(props) {
    //const [modalVisible, setModalIsVisible] = useState(false);
    const [plant, setPlant] = useState({
        plant_id: 1,
        common_name: "",
        latin_name: "",
        light_level: "", 
        min_temp: 0, 
        max_temp: 0, 
        rec_temp: 0, 
        hardiness_zone: "", 
        soil_type: "",
        image: ""
    });

    useEffect(() => {
        const fetchPlant = async () => {
            await axios.get(`${props.nodeServer}/plant/${props.userPlant.plant_ID}`).then((response) => {
                setPlant(response.data)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }

        fetchPlant();
    });

    return (
        <View style={styles.item}>
            <View style={styles.nameplate}>
            <View>
                <Image
                    style={styles.tinyImage}
                    source={{uri:plant.image }}
                />
                <Text style={styles.title}>Plant Name: {plant.common_name}</Text>
                <Text style={styles.title}>Latin Name: {plant.latin_name}</Text>
            </View>
            </View>
            <Text style={styles.title}>Quantity: {props.userPlant.plant_qty}</Text>
            <Text style={styles.title}>Planting Date {props.userPlant.planting_date}</Text>
      </View>
    );
}
export default UserPlantPreview;