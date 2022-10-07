import { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import parseDate from 'postgres-date'
import axios from 'axios';

function UserPlantPreview(props) {
    const [subModalVisible, setSubModalIsVisible] = useState(false);
    const [plant, setPlant] = useState({});

    useEffect(() => {
        const fetchPlant = async () => {
            await axios.get(`${props.nodeServer}/plants/${props.userPlant.plant_key}`).then((response) => {
                setPlant(response.data)
            }).catch(err => {
                console.log('Error: ', err);
            });
        }

        fetchPlant();
    });

    return (
        <View style={styles.item}>
            <Pressable
            onPress={() => setSubModalIsVisible(true)}
            >
            <View style={styles.nameplate}>
            <View>
                <Image
                    style={styles.tinyImage}
                    source={{uri: plant.img }}
                />
                <Text style={styles.title}>Plant Name: {plant.common_name}</Text>
                <Text style={styles.title}>Latin Name: {plant.latin_name}</Text>
            </View>
            </View>
            <Text style={styles.title}>Quantity: {props.userPlant.plant_qty}</Text>
            <Text style={styles.title}>Planting Date: </Text>
            </Pressable>
            <UserPlantFullView nodeServer ={props.nodeServer} visible={subModalVisible} userPlant={props.userPlant} plant={plant} onClose={() => setSubModalIsVisible(false)}/>
      </View>
    );
}
export default UserPlantPreview;