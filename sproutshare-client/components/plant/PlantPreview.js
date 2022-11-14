import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image } from 'react-native'
import PlantFullView from './PlantFullView';
import styles from "../../styles/styles";

function PlantPreview(props) {
    const [modalVisible, setModalIsVisible] = useState(false);


    return(
        <Pressable 
            onPress={() => setModalIsVisible(true)}
            >
        <View style={styles.item}>
                <Image
                    style={styles.veggieImage}
                    source={{uri: props.plant.img }}
                />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Plant Name: {props.plant.common_name}</Text>
                <Text style={styles.title}>Latin Name: {props.plant.latin_name}</Text>
            </View>
            <PlantFullView visible={modalVisible} plant={props.plant} onClose={() => setModalIsVisible(false)}/>
      </View>
      </Pressable>
    );
}



export default PlantPreview;