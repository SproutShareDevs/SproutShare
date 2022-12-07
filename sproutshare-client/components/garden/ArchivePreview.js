import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Button } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import axios from 'axios';


function ArchivePreview(props) {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        const fetchPlant = async () => {
            await axios.get(`${props.nodeServer}/plants/${props.userPlant.plant_key}`).then((response) => {
                setPlant(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log('Error fetching user plant: ', err);
            });
        }
        fetchPlant();
    }, []);

    return(
        <Pressable
            onLongPress={() => props.onDelete(props.userPlant.user_plant_key)}
            >
            <View style={styles.item}>
                <Image
                    style={styles.veggieImage}
                    source={{uri: plant.img }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.veggieText}>Plant Name: {plant.common_name}</Text>
                    <Text style={styles.veggieText}>Plant Success: {props.userPlant.plant_quality}</Text>
                    <Text style={styles.veggieText}>Plant Difficulty: {props.userPlant.plant_difficulty}</Text>
                </View>
            </View>
        </Pressable>

    )

}

export default ArchivePreview;