import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Button } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import axios from 'axios';

function UserPlantPreview(props) {
    const [subModalVisible, setSubModalIsVisible] = useState(false);
    const [plant, setPlant] = useState({});
    const [plantingDate, setPlantingDate] = useState('');


    useEffect(() => {
        const fetchPlant = async () => {
            await axios.get(`${props.nodeServer}/plants/${props.userPlant.plant_key}`).then((response) => {
                setPlant(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log('Error fetching user plant: ', err);
            });
        }
        const extractDate = () => {
            const regexExtract = /^(\d{4})-\d{2}-(\d{2})/g;
            const reorderDate = "$2 $1";
            let result = props.userPlant.planting_date.match(regexExtract);
            setPlantingDate(result);
        }

        fetchPlant();
        extractDate();

    }, []);

    const deleteHandler = () => {
        props.onDelete();
        setSubModalIsVisible(false);
    }

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
            <Text style={styles.title}>Planting Date: {plantingDate}</Text>
            </Pressable>
            <UserPlantFullView nodeServer ={props.nodeServer} visible={subModalVisible} userPlant={props.userPlant} 
                                plant={plant} onDelete={deleteHandler} onClose={() => setSubModalIsVisible(false)}/>
      </View>
    );
}
export default UserPlantPreview;