import { useEffect, useState } from "react";
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
                
                    <View style = {{flexDirection: 'column'}}>
                    <Text style={styles.myGardenTitle}>Garden</Text>
                    <Text style={styles.myGardenID}>{props.garden.garden_key}</Text>
                    </View>
                    <View style = {{flexDirection: 'column', marginLeft: 30, marginTop: 30}}>
                    <Text style={styles.myGardenSubs}>Light Level: {props.garden.light_level}</Text>
                    <Text style={styles.myGardenSubs}>Soil Type: {props.garden.soil_key}</Text>                    
                    </View>
                </View>
                </Pressable>
            <GardenFullView nodeServer ={props.nodeServer} visible={modalVisible} garden={props.garden} onClose={() => setModalIsVisible(false)}/>
        </View>

    );
}

export default GardenPreview;