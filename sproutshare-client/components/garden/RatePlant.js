import { useEffect, useState } from 'react';
import { View, Text, Image, Modal, Button, TouchableOpacity } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';

function RatePlant(props) {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        const fetchPlant = async () => {
            await axios.get(`${props.nodeServer}/plants/${props.plantKey}`).then((response) => {
                setPlant(response.data);
                console.log(response.data);
            }).catch(err => {
                console.log('Error fetching user plant: ', err);
            });
        }
        fetchPlant();
    }, []);

    return (
        <View style={styles.item}>
            <Image
                style={styles.veggieImage}
                source={{ uri: plant.img }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.veggieText}>{plant.common_name}</Text>
                <Text style={styles.veggieText}>{props.plantingDate}</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
                <Text>How well does this plant grow?</Text>
                <FiveButtons {...props} buttonPressed={(qual) => { props.updateQuality(props.userPlantKey, qual) }} />
                <Text>How difficult is it to grow this plant?</Text>
                <FiveButtons {...props} buttonPressed={(diff) => { props.updateDifficulty(props.userPlantKey, diff) }} />
            </View>

        </View>
    )
}

function FiveButtons(props) {
    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button title='1' onPress={() => props.buttonPressed(1)}></Button>
            <Button title='2' onPress={() => props.buttonPressed(2)}></Button>
            <Button title='3' onPress={() => props.buttonPressed(3)}></Button>
            <Button title='4' onPress={() => props.buttonPressed(4)}></Button>
            <Button title='5' onPress={() => props.buttonPressed(5)}></Button>
        </View>
    )
}

export default RatePlant;