import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Button } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import axios from 'axios';

function UserPlantPreview(props) {
    const [subModalVisible, setSubModalIsVisible] = useState(false);
    const [plant, setPlant] = useState({});
    const [plantingDate, setPlantingDate] = useState('');

    const extractDate = () => {
        const regexExtract = /^(\d{4})-\d{2}-(\d{2})/g;
        const reorderDate = "$2 $1";
        let result = props.userPlant.planting_date.match(regexExtract);
        setPlantingDate(result);
    }

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
        extractDate();

    }, []);

    const deleteHandler = () => {
        props.onDelete();
        setSubModalIsVisible(false);
    }

    return (
        <Pressable
            onPress={() => setSubModalIsVisible(true)}
            >
            <View style={styles.item}>
                <Image
                    style={styles.veggieImage}
                    source={{uri: plant.img }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.veggieText}>Plant Name: {plant.common_name}</Text>
                    <Text style={styles.veggieText}>Quantity: {props.userPlant.plant_qty}</Text>
                    <Text style={styles.veggieText}>Planting Date: {plantingDate}</Text>
                </View>
                <UserPlantFullView formattedPlantingDate={plantingDate} nodeServer ={props.nodeServer} visible={subModalVisible} userPlant={props.userPlant} 
                                    plant={plant} onDelete={deleteHandler} onClose={() => setSubModalIsVisible(false)}/>
            </View>
        </Pressable>
    );
}
export default UserPlantPreview;