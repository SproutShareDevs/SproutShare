import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image } from 'react-native'
import styles from "../../../styles/styles";

function PlantOption(props) {
    const [bgColor, setBgColor] = useState('#90EE90');
    const [isSelected, toggleIsSelected] = useState(false);

    const selected = () => {
        if(!isSelected){
            toggleIsSelected(true);
            setBgColor('#90EE00');
            props.selectPlant(props.plant);
        } else {
            toggleIsSelected(false);
            setBgColor('#90EE90');
        }
    }

    return(
        <View style={{backgroundColor: bgColor,
                    padding: 20,
                    marginVertical: 8,
                    marginHorizontal: 16,}}>
            <Pressable 
            onPress={() => {selected()}}
            >
            <View style={styles.nameplate}>
            <Image
                style={styles.tinyImage}
                source={{uri: props.plant.img }}
            />
            <View>
                <Text style={styles.title}>Plant Name: {props.plant.common_name}</Text>
                <Text style={styles.title}>Latin Name: {props.plant.latin_name}</Text>
            </View>
            </View>
            <Text style={styles.title}>Hardiness Zone: {props.plant.hardiness_zone}</Text>
            <Text style={styles.title}>Soil Type: {props.plant.soil_type}</Text>
            <Text style={styles.title}>min_temp: {props.plant.min_temp}</Text>
            <Text style={styles.title}>max_temp: {props.plant.max_temp}</Text>
            </Pressable>
      </View>
    );
}



export default PlantOption;