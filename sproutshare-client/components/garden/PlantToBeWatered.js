import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Button } from 'react-native'
import UserPlantFullView from './UserPlantFullView';
import styles from "../../styles/styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

function PlantToBeWatered(props) {
    const [subModalVisible, setSubModalIsVisible] = useState(false);
    const [plant, setPlant] = useState({});
    const [plantingDate, setPlantingDate] = useState('');
    const [waterChecked, setWaterChecked] = useState(false);
    const [oldWaterAmount, setOldWaterAmount] = useState(0);

    const extractDate = () => {
        const regexExtract = /^(\d{4})-\d{2}-(\d{2})/g;
        const reorderDate = "$2 $1";
        let result = props.userPlant.planting_date.match(regexExtract);
        setPlantingDate(result);
    }

    const markWateringStatus = async() => {
        let accessToken = await SecureStore.getItemAsync('AccessToken');
        
        // executes when user checks checkbox
        // waters the plant
        if(!waterChecked) {
            setWaterChecked(!waterChecked);
            console.log("Checkbox checked");
            // fetch current water amount, store it in state
            setOldWaterAmount(props.userPlant.water_amount);
            axios.put(`${props.nodeServer}/userPlants/updatewateramount/${props.userPlant.user_plant_key}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            water_amount: 1
            }).then((response) => {
                //setUserPlantData(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log('Error: ', err);
            });

        // executes when user unchecks the checkbox
        // retrieves oldWaterAmount, resets value of water_amount in database
        // note: on user garden remount this data will be lost and plant will be gone from checklist
        } else {
            setWaterChecked(!waterChecked);
            console.log("Checkbox unchecked");
            axios.put(`${props.nodeServer}/userPlants/updatewateramount/${props.userPlant.user_plant_key}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                water_amount: oldWaterAmount
                }).then((response) => {
                    //setUserPlantData(response.data);
                    console.log(response.data);
                }).catch(err => {
                    console.log('Error: ', err);
                });
        }
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
            <View style={styles.wateringItem}>
                <Image
                    style={styles.wateringImage}
                    source={{ uri: plant.img }}
                />
                <View style={styles.wateringTextContainer}>
                    <Text style={styles.wateringTextBold}>{plant.common_name}</Text>
                    <Text style={styles.wateringText}>Garden: {props.userPlant.garden_name}</Text>
                    <Text style={styles.wateringText}>Planted: {plantingDate}</Text>
                </View>
                <BouncyCheckbox
                    size={50}
                    fillColor="#90ee90"
                    unfillColor="#FFFFFF"
                    innerIconStyle={{borderColor: "black", borderWidth: 3}}
                    value={waterChecked}
                    onPress={markWateringStatus}
                    style={styles.checkbox}
                />

                <UserPlantFullView formattedPlantingDate={plantingDate} nodeServer={props.nodeServer} visible={subModalVisible} userPlant={props.userPlant}
                    plant={plant} onDelete={deleteHandler} onClose={() => setSubModalIsVisible(false)} />
            </View>
        </Pressable>
    );
}
export default PlantToBeWatered;