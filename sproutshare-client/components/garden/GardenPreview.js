import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image } from 'react-native'
import GardenFullView from './GardenFullView';
import styles from "../../styles/styles";

function GardenPreview(props) {
    const [modalVisible, setModalIsVisible] = useState(false);

    return (
        <View style={styles.item}>
            <Pressable 
            onPress={() => setModalIsVisible(true)}
            >
                <View style={styles.nameplate}>
                <View>
<<<<<<< HEAD
                    <Text style={styles.title}>Garden ID: {props.garden.garden_id}</Text>
=======
                    <Text style={styles.title}>Garden ID: {props.garden.garden_key}</Text>
>>>>>>> 9f96813c5ba5872bc8c1454d4de909bb1b7298d2
                    <Text style={styles.title}>Light Level: {props.garden.light_level}</Text>
                    <Text style={styles.title}>Soil Type: {props.garden.soil_id}</Text>
                </View>
                </View>
            </Pressable>
            <GardenFullView nodeServer ={props.nodeServer} visible={modalVisible} garden={props.garden} onClose={() => setModalIsVisible(false)}/>
        </View>

    );
}

export default GardenPreview;