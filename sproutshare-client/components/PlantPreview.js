import { useState } from "react";
import {StyleSheet, View, Text, Pressable, Image } from 'react-native'
import PlantFullView from './PlantFullView';

function PlantPreview(props) {
    const [modalVisible, setModalIsVisible] = useState(false);


    return(
        <View style={styles.item}>
            <Pressable 
            onPress={() => setModalIsVisible(true)}
            >
            <View style={styles.nameplate}>
            <Image
                style={styles.tinyImage}
                source={{uri: props.plant.image }}
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
            <PlantFullView visible={modalVisible} plant={props.plant} onClose={() => setModalIsVisible(false)}/>
      </View>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#90EE90',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
    },
    tinyImage: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    nameplate: {
      flexDirection: 'row',
      marginBottom: 10
    }
  });

export default PlantPreview;