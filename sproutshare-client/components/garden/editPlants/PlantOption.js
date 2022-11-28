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
        <Pressable
            onPress={() => { selected() }}
        >
            <View style={[styles.item,
                {backgroundColor:bgColor}
                ]}>
                <Image
                    style={styles.veggieImage}
                    source={{ uri: props.plant.img }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Plant Name: {props.plant.common_name}</Text>
                    <Text style={styles.title}>Latin Name: {props.plant.latin_name}</Text>
                </View>
            </View>
        </Pressable>
    );
}



export default PlantOption;