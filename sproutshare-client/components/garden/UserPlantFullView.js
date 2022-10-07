import { useEffect, useState } from 'react';
import {View, Text, Image, Modal, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import axios from 'axios';


function UserPlantFullView(props) {

    return (
        <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.containerCenter}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.commonName}>Plant Name: {props.plant.common_name}</Text>
                    <Text style={styles.latinName}>Latin Name: {props.plant.latin_name}</Text>
                </View>
                
                <Image
                    style={styles.mediumImage}
                    source={{uri: props.plant.img }}
                />
                <Text style={styles.title}> Quantity Planted: {props.userPlant.quantity} </Text>
                <Text style={styles.title}> Date Planted: </Text>
                  <Button title='Close' onPress={props.onClose}/>
            </View>
        </Modal>
      </>
    );
    
}

export default UserPlantFullView;